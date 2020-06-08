import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const provider_id = request.params.provider_id;
        const { month, year } = request.body;

        const listProviderMonthAvailabilityService = container.resolve(
            ListProviderMonthAvailabilityService
        );
        const providers = await listProviderMonthAvailabilityService.execute({
            provider_id,
            month,
            year,
        });

        return response.json(providers);
    }
}
