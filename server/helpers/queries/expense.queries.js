import ObjectID from "../../utils/ObjectID.js";

export const findExpenses = ({ startDate, endDate, search, loggedInUser, pageNumber }) => {
    const filter = [];

    if (!loggedInUser) {
        return filter;
    }
    filter.push({ $match: { user: ObjectID(loggedInUser.id) } });

    if (startDate)
        filter.push({
            $match: {
                createdAt: { $gte: startDate },
            },
        });
    if (endDate)
        filter.push({
            $match: {
                createdAt: { $lte: endDate },
            },
        });
    if (search)
        filter.push({
            $match: {
                $or: [
                    { description: { $regex: search, $options: "i" } },
                    { name: { $regex: search, $options: "i" } },
                ],
            },
        });

    filter.push({
        $sort: {
            createdAt: -1,
        },
    });
    filter.push({
        $project: {
            _id: 0,
            id: "$_id",
            createdAt: 1,
            amount: 1,
            description: 1,
            name: 1,
            user: 1,
            images: 1
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
        $unwind: '$userDetails'
    });

    filter.push({
        $addFields: {
            'user.id': '$userDetails._id',
            'user.fullNameEnglish': '$userDetails.fullNameEnglish',
            'user.fullNameArabic': '$userDetails.fullNameArabic',
            'user.email': '$userDetails.email',
            'user.role': '$userDetails.role',
        }
    });

    filter.push({
        $project: {
            userDetails: 0
        }
    });
    filter.push({
        $skip: pageNumber * 20
    },
        { $limit: 20 })

    return filter;
};

export const findValueSum = (_id) => {
    const filter = [
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ];

    if (_id)
        filter.unshift({
            $match: {
                _id: { $in: _id },
            },
        });

    return filter;
};