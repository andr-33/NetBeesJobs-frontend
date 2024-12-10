import { supabase } from '../utils/supabaseConnection';

//Consultas para consultar data
export const fetchBusiness = async (userId) => {
    try {
        const { data: companyData, error: companyError } = await supabase
            .from('emp_empresas')
            .select(`
                emp_empresas_id,
                nombre,
                acronimo,
                fecha_alta
            `)
            .eq('mst_usuarios_id', userId)
            .single();

        if (companyError) {
            console.error("Error al obtener datos de la empresa:", companyError);
            return { error: "No se encontraron datos de la empresa" };
        }

        if (!companyData) {
            console.error("No se encontró información de la empresa para el usuario:", userId);
            return { error: "No se encontraron datos de la empresa" };
        }

        return companyData;
    } catch (error) {
        console.error('Error en fetchBusiness:', error.message);
        return { error: error.message };
    }
};

export const fetchProyects = async (empEmpresasId) => {
    try {
        const { data, error } = await supabase
            .from('emp_proyectos')
            .select('*')
            .eq('emp_empresas_id', empEmpresasId);  

        if (error) {
            console.error("Error obteniendo proyectos:", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error en fetchProyects:', error.message);
        return [];
    }
};

export const fecthOffersByProject = async(projectId) =>{
    try{
        const {data: offersData, error: offersError} = await supabase
            .from('emp_ofertas')
            .select('*')
            .eq('emp_proyectos_id', projectId);

        const {data: projectData, error: projectError} = await supabase
            .from('emp_proyectos')
            .select('nombre,emp_empresas_id')
            .eq('emp_proyectos_id',projectId)
            .single();

        if(projectError){
            return {projectError}
        };

        const {data: companyData, error: companyError} = await supabase
            .from('emp_empresas')
            .select('nombre,logo_link')
            .eq('emp_empresas_id', projectData.emp_empresas_id)
            .single();
        
        if(offersError || companyError){
            return {offersError}||{companyError}
        };

        return {
            offers: offersData,
            projectName: projectData.nombre,
            companyName: companyData.nombre
        }
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return { error };
    }
};

export const fetchCandidatesByOffer = async(offerId) =>{
    try{
        const {data: candidatesData, error: candidatesError} = await supabase
            .from('can_cv_ofertas')
            .select('can_cv_ofertas_id, can_cv(*, nb_usuarios(*))')
            .eq('emp_ofertas_id',offerId);
        
        if(candidatesError){
            return {candidatesError}
        }
        return candidatesData
    }catch (error){

    }
};

//Consultas para guardar data
export const createProfile = async(values) =>{
    try{
        const {mst_comunidades_id, mst_provincias_id, ...usefulFields} = values;
        const {data, error} = await supabase
            .from('emp_empresas')
            .insert(usefulFields)
            .select();

        if(error){
            return {error}
        }
        return null;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const addOffers = async(values) => {
    try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) return { error: authError };

        const { data: userTypeData, error: userTypeError } = await supabase
            .from('mst_usuarios')
            .select('tipo')
            .eq('mst_usuarios_id', authData.user.id)
            .single();

        if (userTypeError || userTypeData.tipo !== 2) {
            return { error: "No tienes permisos para crear ofertas." };
        }
        
        const { data, error } = await supabase.from('emp_ofertas').insert(values).select();

        if (error) {
            console.error("Error en la respuesta de Supabase:", JSON.stringify(error, null, 2));
            return { error };
        }

        return data;
    } catch (error) {
        console.error('Error al realizar la consulta:', JSON.stringify(error, null, 2));
        return { error: error.message };
    }
};

export const addProyect = async (values) => {
    try {  
        const {fecha_ini_mes,fecha_ini_año,fecha_fin_mes,fecha_fin_año, ...usefulFields} = values
        const { error } = await supabase
            .from('emp_proyectos')
            .insert(usefulFields)
            .select();

        if (error) {
            console.error("Error al insertar proyecto:", error);
            return { error };
        }
        return null;
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        return {error};
    }
};

//Actualizar data

//Eliminar data
export const deleteProyect = async (projectId) => {
    try {
        const { data, error } = await supabase
            .from('emp_proyectos')
            .delete()
            .eq('emp_proyectos_id', projectId);

        if (error) {
            console.error("Error al eliminar el proyecto:", error);
            return { error };
        }

        return data;
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        return { error: error.message };
    }
};

export const deleteOffer = async (offerId) => {
    try {
        console.log("Iniciando eliminación de registros relacionados en can_cv_ofertas para emp_ofertas_id:", offerId);
        const { error: deleteRelatedError } = await supabase
            .from('can_cv_ofertas')
            .delete()
            .eq('emp_ofertas_id', offerId);

        if (deleteRelatedError) {
            console.error("Error al eliminar registros relacionados en can_cv_ofertas:", deleteRelatedError);
            return { error: deleteRelatedError };
        }

        console.log("Registros relacionados eliminados en can_cv_ofertas para emp_ofertas_id:", offerId);
        console.log("Iniciando eliminación de la oferta en emp_ofertas para emp_ofertas_id:", offerId);

        const { data, error } = await supabase
            .from('emp_ofertas')
            .delete()
            .eq('emp_ofertas_id', offerId);

        if (error) {
            console.error("Error al eliminar la oferta en emp_ofertas:", error);
            return { error };
        }

        console.log("Oferta eliminada exitosamente en emp_ofertas para emp_ofertas_id:", offerId, data);
        return data;
    } catch (error) {
        console.error('Error al realizar la consulta en deleteOffer:', error.message);
        return { error: error.message };
    }
};