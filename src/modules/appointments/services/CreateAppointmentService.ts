import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({
        provider_id,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentsInSameDate) {
            console.log('tnc!!!');
            throw new AppError('This appointment is already booked!');
        }

        const appointment = this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
