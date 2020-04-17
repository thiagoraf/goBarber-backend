import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentRepository
        );
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await appointmentRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentsInSameDate) {
            throw Error('This appointment is already booked!');
        }

        const appointment = appointmentRepository.create({
            provider,
            date: appointmentDate,
        });

        const response = await appointmentRepository.save(appointment);

        return response;
    }
}

export default CreateAppointmentService;
