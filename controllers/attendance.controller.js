import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/attendance.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import Attendance from '../models/attendance.js';
import { AttendanceSchema } from '../schemas/index.js';
import ResponseError from '../utils/respErr.js';

// create a new attendance, edit a attendance, delete a attendance, get all attendances, get a single attendance, delete a attendance after 1 day
export const getAllAttendances = async (req, res, next) => {
    const { from, to, search } = ReqQueryHelper(req.query);
    const attendances = await Attendance.aggregate(queryHelper.findAttendance(from, to, search));
    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            attendances,
            from,
            to,
            search,
        },
    });
}

export const createAttendance = async (req, res, next) => {
    try {
        // validate the request body using the schema
        const isValidationError = AttendanceSchema.safeParse(req.body);
        if (!isValidationError.success) {
            return next(new ResponseError(
                isValidationError.error.errors[0].message
                , statusCodes.BAD_REQUEST));
        }

        const { date, status, advancePayment, leaveTime, attendanceTime, user } = AttendanceSchema.parse(req.body);

        // upload images to cloudinary

        const attendance = await Attendance.create({
            date,
            status,
            advancePayment,
            leaveTime,
            attendanceTime,
            user,
            createdBy: req.user._id,
        });

        res.status(statusCodes.CREATED).json({
            status: 'success',
            message: 'Attendance created successfully',
            data: attendance,
        });
    } catch (error) {
        next(new ResponseError(error.message, statusCodes.BAD_REQUEST));
    }
}

export const editAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.attendanceId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!attendance) {
            return next(new ResponseError('Attendance not found', statusCodes.NOT_FOUND));
        }
        res.status(statusCodes.OK).json({
            status: 'success',
            message: 'Attendance updated successfully',
            data: attendance,
        });
    } catch (error) {
        next(new ResponseError(error.message, statusCodes.BAD_REQUEST));
    }
}

export const deleteAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.attendanceId);
        if (!attendance) {
            return next(new ResponseError('Attendance not found', statusCodes.NOT_FOUND));
        }
        res.status(statusCodes.OK).json({
            status: true,
            message: 'Attendance deleted successfully',
        });
    } catch (error) {
        next(new ResponseError(error.message, statusCodes.BAD_REQUEST));
    }
}
export const getSingleAttendance = async (req, res, next) => {
    const attendance = await Attendance.findById(req.params.attendanceId).populate('user', 'fullNameEnglish fullNameArabic email role').populate('createdBy', 'fullNameEnglish fullNameArabic email role');
    if (!attendance) {
        return next(new ResponseError('Attendance not found', statusCodes.NOT_FOUND));
    }
    res.status(statusCodes.OK).json({
        status: 'success',
        data: attendance,
    });
}

// export const createAttendancePDF = (req, res, next) => {
//     const { attendances, from, to, rangeTotalValue, allTimeTotalValue } = req.body;
//     const pdfBuffer = buildPDF(attendances, from, to, rangeTotalValue, allTimeTotalValue);

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=attendances.pdf');
//     res.send(Buffer.concat(pdfBuffer));
// }