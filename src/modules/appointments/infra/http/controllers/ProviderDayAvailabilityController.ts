import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const provider_id = request.params.provider_id;
        const { day, month, year } = request.query;

        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService
        );
        const providers = await listProviderDayAvailabilityService.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(providers);
    }
}
