import { supabase } from '../utils/supabaseConnection';
import { Buffer } from 'buffer';

const getNbID = async(userId) =>{
    try{
        const {data, error} = await supabase
            .from('nb_usuarios')
            .select('nb_usuarios_id')
            .eq('mst_usuarios_id',userId)
            .single();

        if(error){
            return {error};
        }
        return data.nb_usuarios_id;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

//Consultar para consultar data
export const fetchProfile = async(userId) =>{
    try{
        const {data:authData, error:authError} = await supabase.auth.getUser();
        if(authError){
            return{error:authError}
        }

        const {data:profileData, error:errorProfile} = await supabase
            .from('nb_usuarios')
            .select(`
                nb_usuarios_id,
                nombre,
                primer_apellido,
                segundo_apellido,
                fecha_nacimiento,
                mst_clases_doc_id,
                num_documento,
                mst_sexo_id,
                mst_ciudades_id,
                nacionalidad_id,
                telefono_movil,
                codigo_postal
            `)
            .eq('mst_usuarios_id',userId)
            .single();
        
        if(errorProfile){
            return{error:errorProfile}
        }
        return {
            ...profileData,
            correo: authData.user.user_metadata.email
        };
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const fetchStudies = async(userId) =>{
    try{
        const {data:studiesData, error} = await supabase
            .from('can_estudios')
            .select(`
                titulo,
                nombre_instituto,
                fecha_ini,
                fecha_fin,
                meses_estudiados,
                can_estudios_id
            `)
            .eq('nb_usuarios_id',userId);
        
        if(error){
            return {error};
        }
        return studiesData;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const fetchExperience = async(userId) =>{
    try{
        const {data:experienceData, error} = await supabase
            .from('can_exp_laboral')
            .select(`
                can_exp_laboral_id,
                nombre_empresa,
                nombre_puesto,
                fecha_ini,
                fecha_fin,
                empleo_actual,
                descripcion
            `)
            .eq('nb_usuarios_id', userId);

        if(error){
            return {error};
        }
        return experienceData;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const fetchLocationData = async(cityID) =>{
    try{
        const {data: provinceData, error: provinceError} = await supabase
            .from('mst_ciudades')
            .select('mst_provincias_id')
            .eq('mst_ciudades_id',cityID)
            .single();
        
        if(provinceError){
            return {provinceError}
        }
        const {data: communityData, error: communityError} = await supabase
            .from('mst_provincias')
            .select('mst_comunidades_id')
            .eq('mst_provincias_id',provinceData.mst_provincias_id)
            .single();

        if(communityError){
            return {communityError}
        }
        
        const locationData = {
            'mst_provincias_id': provinceData.mst_provincias_id,
            'mst_comunidades_id': communityData.mst_comunidades_id
        };
        return locationData;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const fetchCvFiles = async(userId)=>{
    try{
        const nbUserId = await getNbID(userId);
        const {data: cvsData, error: cvsError} = await supabase
            .from('can_cv')
            .select('can_cv_id,fecha,nombre')
            .eq('nb_usuarios_id',nbUserId)
        
        if(cvsError){
            return {cvsError}
        }

        return cvsData;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const fetchOffers = async(filters, userId)=>{
    try{
        const nbUserId = await getNbID(userId);
        let query = supabase
            .from('emp_ofertas')
            .select(`
                *, 
                emp_proyectos(emp_proyectos_id, emp_empresas(nombre)),
                can_cv_ofertas(can_cv_ofertas_id,nb_usuarios_id)
            `)
            .eq('can_cv_ofertas.nb_usuarios_id',nbUserId);
        
        if (filters.workingPlace) {
            query = query.eq('mst_puestos_id', filters.workingPlace);
        }
        if (filters.sector) {
            query = query.eq('mst_emp_sector_id', filters.sector);
        }
        if (filters.community) {
            query = query.eq('mst_ciudades_id', filters.community);
        }
        if (filters.name) {
            query = query.ilike('nombre', `%${filters.name}%`);
        }

        const {data, error} = await query;
            
        if(error){
            return {error}
        }
    
        return data;
    }catch (error) {
        console.error('Error al realizar la consulta: ', error.message);
        return { error };
    }
};

//Consultas para guardar data
export const createProfile = async(values) =>{
    try{
        const {mst_comunidades_id, mst_provincias_id, ...usefulFields} = values;
        const { data, error } = await supabase
            .from('nb_usuarios')
            .insert(usefulFields)
            .select();
    
        if(error){
            return {error};
        }
        return null;
    } catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const addStudies = async(values) =>{
    try{
        const {fecha_ini_mes,fecha_ini_año,fecha_fin_mes,fecha_fin_año, ...usefulFields} = values;
        const {error} = await supabase
            .from('can_estudios')
            .insert(usefulFields)
            .select();
        
        if(error){
            return {error};
        }
        return null;
    } catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const addExperience = async(values) =>{
    try{
        const {fecha_ini_mes,fecha_ini_año,fecha_fin_mes,fecha_fin_año, ...usefulFields} = values
        const {error} = await supabase
            .from('can_exp_laboral')
            .insert(usefulFields)
            .select();

        if(error){
            return {error};
        }
        return null;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const uploadCvFile = async(file, userId) =>{
    try{
        const nbUserId = await getNbID(userId);
        if(nbUserId.error){
            return {error: nbUserId.error}
        }
        console.log(file);
        const base64Data = file.uri.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        const fileNameWithNoAccents =  file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const {data:bucketData, error:bucketError} = await supabase.storage
            .from('CVs')
            .upload(`NetBees/${fileNameWithNoAccents}`,buffer,{
                cacheControl: '3600',
                upsert: false
            });

        if(bucketError){
            return {bucketError};
        }

        const publicUrl = `https://rrimfuqrhwbjfsqindsa.supabase.co/storage/v1/object/public/${bucketData.fullPath}`
        const cvValues = {
            'nb_usuarios_id': nbUserId,
            'cv_link': publicUrl,
            'estado': 0,
            'fecha': new Date()
        };

        const {error:cvError} = await supabase
            .from('can_cv')
            .insert(cvValues)
            .eq('nb_usuarios_id', nbUserId)

        if(cvError){
            return {cvError}
        }
        return null;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const uploadProfilePhoto = async(photo) =>{
    try{
        console.log(photo);
        const base64Data = photo.uri.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        const {data: bucketData, error: bucketError} = await supabase.storage
            .from('imgPerfil')
            .upload(`Imagenes/${photo.fileName}`,buffer,{
                cacheControl: '3600',
                upsert: false,
                contentType: photo.mimeType
            });
        console.log(bucketError)
        if(bucketError){
            return {bucketError}
        }

        const publicUrl = `https://rrimfuqrhwbjfsqindsa.supabase.co/storage/v1/object/public/${bucketData.fullPath}`
        console.log(publicUrl);
        return publicUrl;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const registerInOffer = async(userId, offerId, selectedCvId) =>{
    try{
        const nbUserId = await getNbID(userId);
        const {error: registeredError} = await supabase
            .from('can_cv_ofertas')
            .insert({
                can_cv_id: selectedCvId,
                emp_ofertas_id: offerId,
                nb_usuarios_id: nbUserId
            })
            .select();

        if(registeredError){
            return {registeredError}
        }
        
        return null;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

//Actualizar data
export const updateProfile = async(userId, values) =>{
    try{
        const {nb_usuarios_id, correo, ...usefulFields} = values;
        const { error } = await supabase
            .from('nb_usuarios')
            .update(usefulFields)
            .eq('mst_usuarios_id',userId);

        if(error){
            return {error}
        }
        return null;
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error}
    }
};

//Eliminar data
export const deleteExperience = async(experienceId) =>{
    try{
        const {error} = await supabase
            .from('can_exp_laboral')
            .delete()
            .eq('can_exp_laboral_id', experienceId);

        if(error){
            return {error};
        }
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

export const deleteStudy = async(studyId) =>{
    try{
        const {error} = await supabase
            .from('can_estudios')
            .delete()
            .eq('can_estudios_id', studyId);

        if(error){
            return {error};
        }
    }catch (error){
        console.error('Error al realizar la consulta: ', error.message);
        return {error};
    }
};

