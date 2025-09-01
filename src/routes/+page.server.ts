import type { PageServerLoad } from './$types';
import { whatToCode } from '$lib/what-to-code';

export const load: PageServerLoad= async () => {
    const ideas = await whatToCode.getIdeas();
    return { ideas: ideas.rows };
}