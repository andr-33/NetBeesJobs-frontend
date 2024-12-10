import { supabase } from '../utils/supabaseConnection';

export const login = async(values) => {
    try{
        const { data, error} = await supabase.auth.signInWithPassword(values);
        if(error){
            throw new Error(error);
        }
        return data.user.id
    } catch(error){
        return {error};
    }
};

export const signUp = async(values) => {
    try{
        const { data, error } = await supabase.auth.signUp(values);
        if(error){
            throw new Error(error);
        }
        return data.user.id;
    } catch(error){
        return {error};
    }
};