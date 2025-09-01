import type { PageServerLoad } from './$types';
import { whatToCode } from '$lib/what-to-code';

export const load: PageServerLoad= async () => {
    const idea = await whatToCode.getRandomIdea();
    return { idea };
}