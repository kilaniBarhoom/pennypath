import ObjectID from "../../utils/ObjectID.js";


export const findPayments = ({ startDate, endDate, search, filterUser, loggedInUser, pageNumber }) => {
    const filter = []

    if (!loggedInUser) {
        return filter;
    }
    filter.push({ $match: { user: ObjectID(loggedInUser.id) } });

    if (startDate && endDate) {
        filter.push({
            $match: {
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        })
    }

    if (search) {
        filter.push({
            $match: {
                $or: [
                    { note: { $regex: search, $options: 'i' } }
                ]
            }
        })
    }

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

    filter.push({
        $project: {
            _id: 0,
            id: "$_id",
            date: 1,
            amount: 1,
            type: 1,
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

    filter.push({
        $skip: pageNumber * 10
    },
        { $limit: 10 });

    return filter;
}

export const findValueSum = ({ _id = null, loggedInUser }) => {
    const filter = [
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ];

    if (!loggedInUser) {
        return [];
    }
    filter.unshift({ $match: { user: ObjectID(loggedInUser.id) } });

    if (_id)
        filter.unshift({
            $match: {
                _id: { $in: _id },
            },
        });

    return filter;
};