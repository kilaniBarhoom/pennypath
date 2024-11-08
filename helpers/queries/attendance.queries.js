import Roles from "../../utils/authRoles.js";

export const findAttendance = ({ startDate, endDate, search, filterUser, onlyAdvancePayments, loggedInUser }) => {
    const filter = [];

    // Restrict by user role if applicable
    if (loggedInUser.role === Roles.USER || loggedInUser.role === Roles.SPECTATOR) {
        filter.push({ $match: { user: ObjectID(loggedInUser.id) } });
    }

    // Handle date range filtering
    if (startDate && endDate) {
        // If both startDate and endDate are provided, use a range
        filter.push({
            $match: {
                date: { $gte: startDate, $lte: endDate },
            },
        });
    } else if (startDate && !endDate) {
        // Only startDate is provided: match the entire day by setting the date range from start to end of the day
        const startOfDay = new Date(new Date(startDate).setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date(startDate).setHours(23, 59, 59, 999));

        filter.push({
            $match: {
                date: { $gte: startOfDay, $lte: endOfDay },
            },
        });
    } else if (!startDate && endDate) {
        // Only endDate is provided: match up to the end of the specified date
        filter.push({
            $match: {
                date: { $lte: new Date(endDate) },
            },
        });
    }

    // Optional search criteria
    if (search) {
        filter.push({
            $match: {
                $or: [
                    { note: { $regex: search, $options: "i" } },
                ],
            },
        });
    }

    // Filter by advance payments if required
    if (onlyAdvancePayments) {
        filter.push({
            $match: {
                advancePayment: { $gt: 0 },
            },
        });
    }

    // Filter by specific user if required
    if (filterUser) {
        filter.push({
            $match: {
                user: ObjectID(filterUser),
            },
        });
    }

    // Sort by date in descending order
    filter.push({
        $sort: {
            date: -1,
        },
    });

    // Project only the required fields
    filter.push({
        $project: {
            _id: 0,
            id: "$_id",
            date: 1,
            attendanceTime: 1,
            status: 1,
            advancePayment: 1,
            leaveTime: 1,
            note: 1,
            user: 1,
            createdBy: 1,
        },
    });

    // Join with users collection to get details of user and createdBy
    filter.push({
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails'
        }
    });
    filter.push({
        $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdByDetails'
        }
    });

    // Unwind userDetails and createdByDetails arrays
    filter.push({
        $unwind: '$userDetails'
    });
    filter.push({
        $unwind: '$createdByDetails'
    });

    // Add fields from the joined documents
    filter.push({
        $addFields: {
            'user.fullNameEnglish': '$userDetails.fullNameEnglish',
            'user.id': '$userDetails._id',
            'user.fullNameArabic': '$userDetails.fullNameArabic',
            'user.email': '$userDetails.email',
            'user.role': '$userDetails.role',
            'createdBy.fullNameEnglish': '$createdByDetails.fullNameEnglish',
            'createdBy.id': '$createdByDetails._id',
            'createdBy.fullNameArabic': '$createdByDetails.fullNameArabic',
            'createdBy.email': '$createdByDetails.email',
            'createdBy.role': '$createdByDetails.role',
        }
    });

    // Exclude userDetails and createdByDetails from the final output
    filter.push({
        $project: {
            userDetails: 0,
            createdByDetails: 0,
        }
    });

    return filter;
};


export const calculateAverageTimes = () => {
    const filter = [
        {
            $match: {
                attendanceTime: { $ne: "00:00" },
                leaveTime: { $ne: "00:00" }
            }
        },
        {
            $addFields: {
                attendanceMinutes: {
                    $add: [
                        { $multiply: [{ $toInt: { $substr: ["$attendanceTime", 0, 2] } }, 60] },
                        { $toInt: { $substr: ["$attendanceTime", 3, 2] } }
                    ]
                },
                leaveMinutes: {
                    $add: [
                        { $multiply: [{ $toInt: { $substr: ["$leaveTime", 0, 2] } }, 60] },
                        { $toInt: { $substr: ["$leaveTime", 3, 2] } }
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                averageAttendanceMinutes: { $avg: "$attendanceMinutes" },
                averageLeaveMinutes: { $avg: "$leaveMinutes" }
            }
        },
        {
            $project: {
                averageAttendanceTime: {
                    $concat: [
                        { $toString: { $floor: { $divide: ["$averageAttendanceMinutes", 60] } } },
                        ":",
                        {
                            $cond: {
                                if: { $lt: [{ $mod: ["$averageAttendanceMinutes", 60] }, 10] },
                                then: { $concat: ["0", { $toString: { $mod: ["$averageAttendanceMinutes", 60] } }] },
                                else: { $toString: { $mod: ["$averageAttendanceMinutes", 60] } }
                            }
                        }
                    ]
                },
                averageLeaveTime: {
                    $concat: [
                        { $toString: { $floor: { $divide: ["$averageLeaveMinutes", 60] } } },
                        ":",
                        {
                            $cond: {
                                if: { $lt: [{ $mod: ["$averageLeaveMinutes", 60] }, 10] },
                                then: { $concat: ["0", { $toString: { $mod: ["$averageLeaveMinutes", 60] } }] },
                                else: { $toString: { $mod: ["$averageLeaveMinutes", 60] } }
                            }
                        }
                    ]
                }
            }
        }
    ];

    return filter;
};

export const getAnalyticsOfUsersAttendances = () => {
    // Calculate the first and last days of the current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const filter = [
        {
            $match: {
                date: {
                    $gte: firstDayOfMonth,
                    $lte: lastDayOfMonth
                }
            }
        },
        {
            $group: {
                _id: "$user",
                totalAttendance: { $sum: 1 },
                totalAdvancePayments: { $sum: "$advancePayment" }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 0,
                totalAttendance: 1,
                totalAdvancePayments: 1,
                "user.fullNameEnglish": 1,
                "user.fullNameArabic": 1,
                "user.email": 1,
                "user.role": 1,
                "user.id": "$_id",
            }
        }
    ];

    return filter; // Modify 'attendances' to your actual collection name
};


