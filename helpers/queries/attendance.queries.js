export const findAttendance = (startDate, endDate, search) => {
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
    // if (search)
    //     filter.push({
    //         $match: {
    //             $or: [
    //                 { name: { $regex: search, $options: "i" } },
    //             ],
    //         },
    //     });

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
            'user.fullNameArabic': '$userDetails.fullNameArabic',
            'user.email': '$userDetails.email',
            'user.role': '$userDetails.role',
        }
    });
    filter.push({
        $addFields: {
            'createdBy.fullNameEnglish': '$userDetails.fullNameEnglish',
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

// export const findValueSum = (_id) => {
//     const filter = [
//         {
//             $group: {
//                 _id: null,
//                 total: { $sum: "$amount" },
//             },
//         },
//     ];

//     if (_id)
//         filter.unshift({
//             $match: {
//                 _id: { $in: _id },
//             },
//         });

//     return filter;
// };