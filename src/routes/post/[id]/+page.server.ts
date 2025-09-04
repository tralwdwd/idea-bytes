import type { PageServerLoad } from './$types';
import { whatToCode } from '$lib/what-to-code';


export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    let idea = await whatToCode.getIdeaById(id);

    return idea != null ? { idea } : { idea: null };
}