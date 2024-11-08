import Roles from "../../utils/authRoles.js";

export const findAttendance = ({ startDate, endDate, search, filterUser, onlyAdvancePayments, loggedInUser }) => {
    const filter = [];
    if (loggedInUser.role === Roles.USER || loggedInUser.role === Roles.SPECTATOR) {
        filter.push({ $match: { user: ObjectID(loggedInUser.id) } });
    }
    if (startDate)
        filter.push({
            $match: {
                date: { $gte: startDate },
            },
        });
    if (endDate)
        filter.push({
            $match: {
                date: { $lte: endDate },
            },
        });
    if (search)
        filter.push({
            $match: {
                $or: [
                    { note: { $regex: search, $options: "i" } },
                ],
            },
        });

    if (onlyAdvancePayments)
        filter.push({
            $match: {
                advancePayment: { $gt: 0 },
            },
        })
    if (filterUser)
        filter.push({
            $match: {
                user: filterUser,
            },
        });

    filter.push({
        $sort: {
            date: -1,
        },
    });
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

    filter.push({
        $unwind: '$userDetails'
    });
    filter.push({
        $unwind: '$createdByDetails'
    });

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


export const getAllPeopleWhoArePresent = ({ startDate, endDate }) => {
    const filter = [
        {
            $match: {
                status: "present",
                date: { $gte: new Date(startDate) }
            }
        },
        {
            $group: {
                _id: "$user",
                count: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $project: {
                _id: 0,
                id: '$_id',
                count: 1,
                'user.fullNameEnglish': '$userDetails.fullNameEnglish',
                'user.id': '$userDetails._id',
                'user.fullNameArabic': '$userDetails.fullNameArabic',
                'user.email': '$userDetails.email',
                'user.role': '$userDetails.role',
            }
        }
    ];

    if (endDate) {
        filter[0].$match.date.$lte = new Date(endDate);
    }

    return filter;
}

