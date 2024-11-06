export const findAttendance = (startDate, endDate, search, filterUser, onlyAdvancePayments) => {
    const filter = [];
    if (startDate)
        filter.push({
            $match: {
                date: { $gte: new Date(startDate) },
            },
        });
    if (endDate)
        filter.push({
            $match: {
                date: { $lte: new Date(endDate) },
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
            as: 'userDetails'
        }
    });

    filter.push({
        $unwind: '$userDetails'
    });

    filter.push({
        $addFields: {
            'user.fullNameEnglish': '$userDetails.fullNameEnglish',
            'user.id': '$userDetails._id',
            'user.fullNameArabic': '$userDetails.fullNameArabic',
            'user.email': '$userDetails.email',
            'user.role': '$userDetails.role',
            'createdBy.fullNameEnglish': '$userDetails.fullNameEnglish',
            'createdBy.id': '$userDetails._id',
            'createdBy.fullNameArabic': '$userDetails.fullNameArabic',
            'createdBy.email': '$userDetails.email',
            'createdBy.role': '$userDetails.role',
        }
    });

    filter.push({
        $project: {
            userDetails: 0
        }
    });
    return filter;
};

export const calculateAverageTimes = () => {
    const filter = [
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

