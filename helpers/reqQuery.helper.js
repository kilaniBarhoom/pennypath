import * as statusCode from "../constants/status.constants.js";
import IsValidID from "../utils/IsValidID.js";
import ResponseError from "../utils/respErr.js";

export default (query) => {
    const { from, to } = query;
    let search = query.search || "";
    search = search.trim();
    const filter = query.filter ? query.filter.split(",") : undefined;
    filter && filter.map((f) => {
        if (!IsValidID(f)) {
            throw new ResponseError(
                "Please provide a valid filter",
                statusCode.BAD_REQUEST
            );
        }
        return f;
    });

    let startDate = null;
    let endDate = null;

    // if (!from && !to) {
    //     startDate = new Date();
    //     endDate = new Date();
    // }

    if (from) {
        startDate = new Date(from);
    }

    if (to) {
        endDate = new Date(to);
    }

    return {
        from: startDate,
        to: endDate,
        search,
        filter,
        serial: query.serial ? query.serial.trim() : null,
    };
};

const getFirstDayOfCurrentMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1, 12, 0, 0, 0);
    // set time to 00:00:00
    firstDay.setUTCHours(0, 0, 0, 0);
    return firstDay;
};

const getLastDayOfCurrentMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0, 12, 0, 0, 0);
    // set time to 23:59:59
    lastDay.setUTCHours(23, 59, 59, 999);
    return lastDay;
};
