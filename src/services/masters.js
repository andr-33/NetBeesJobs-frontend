import { supabase } from '../utils/supabaseConnection';

//Consultas para obtener data
export const fetchSexesData = async() => {
    try{
        const { data: sexes, error } = await supabase
            .from('mst_sexos')
            .select('*');
        return sexes;
    } catch(error){

    }
};

export const fetchCountriesData = async() => {
    try{
        const { data: countries, error } = await supabase
            .from('mst_paises')
            .select('mst_paises_id,nombre');
        return countries;
    } catch(error){

    }
};

export const fetchPhoneCodesData = async() =>{
    try{
        const { data: phoneCodes, error } = await supabase
            .from('mst_paises')
            .select('pref_telefono');
        return phoneCodes;
    } catch(error){

    }
};

export const fetchDocumentTypesData = async() =>{
    try{
        const { data: documentTypes, error } = await supabase
            .from('mst_clases_doc')
            .select('mst_clases_doc_id,clase');
        return documentTypes;
    } catch(error){

    }
};

export const fetchCommunitiesData = async() => {
    try{
        const { data: communitiesData, error } = await supabase
            .from('mst_comunidades')
            .select('mst_comunidades_id,nombre_corto');
        return communitiesData;
    }catch (error){

    }
};

export const fecthProvincesByCommunityData = async(communityId) => {
    try{
        const { data: provincesData, error } = await supabase
            .from('mst_provincias')
            .select('mst_provincias_id,nombre')
            .eq('mst_comunidades_id',communityId);
        return provincesData;
    }catch (error){}
};

export const fetchCitiesByProvinceData = async(provinceId) =>{
    try{
        const { data: citiesData, error } = await supabase
            .from('mst_ciudades')
            .select('mst_ciudades_id,nombre')
            .eq('mst_provincias_id',provinceId);
        return citiesData;
    }catch (error){}
};

export const fetchOptionsToFilterOffers = async() =>{
    try{
        const { data: workingPlaceFilter, error: workingPlaceError } = await supabase
            .from('mst_puestos')
            .select('*');
        
        if(workingPlaceError) return {workingPlaceError}
        
        const { data: sectorFilter, error: sectorError } = await supabase
            .from('mst_emp_sector')
            .select('*');

        if(sectorError) return {sectorError}
        
        const { data: communityFilter, error: communityError } = await supabase
            .from('mst_comunidades')
            .select('*');
        
        if(communityError) return {communityError}

        
        return {
            workingPlaceOptions: workingPlaceFilter,
            sectorOptions: sectorFilter,
            communityOptions: communityFilter
        }
        
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message)
        return {error}
    }
};

export const fetchEmploymentSectors = async() =>{
    try{
        const { data, error } = await supabase
            .from('mst_emp_sector')
            .select('*');

        if(error) return {error}

        return data;
        
    }catch(error){
        console.error('Error al realizar la consulta: ', error.message)
        return {error}
    }
};

//Consultas para consultar data
export const isUserProfileCreated = async(userId) =>{
    try{
        const { data: roleData, error } = await supabase
            .from('mst_usuarios')
            .select('mst_usuarios_id,tipo')
            .eq('mst_usuarios_id', userId)
            .single();
    
        if(error){
            console.log('Usuario no encontrado:', error.message);
            return false;
        }
        return {type: roleData.tipo}
    } catch(error){
        console.error('Error al realizar la consulta: ', error);
        return false;
    }
};

//Consultas para guardar data
export const saveUserRole = async(userId, rol) => {
    try{
        const userRole = {
            mst_usuarios_id: userId,
            tipo: rol
        };

        const { error } = await supabase
            .from('mst_usuarios')
            .insert(userRole)
            .select();
        
        if(error){
            return {error};
        }
        return null;
    } catch (error){
        return {error};
    }
};

//Consultas para eliminar data
export const deleteUserRole = async(userId) =>{
    try{
        const {error} = await supabase
            .from('mst_usuarios')
            .delete()
            .match({mst_usuarios_id: userId});
        if(error){
            return {error};
        }
    }catch (error){
        return {error};
    }
};