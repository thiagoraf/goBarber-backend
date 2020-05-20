import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import AppError from '@shared/errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentRepository
        );
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await appointmentRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentsInSameDate) {
            throw new AppError('This appointment is already booked!');
        }

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate,
        });

        const response = await appointmentRepository.save(appointment);

        return response;
    }
}

export default CreateAppointmentService;
