import { useEffect, useReducer, useState } from 'react';
import s from './Onboarding.module.css';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function Onboarding({session}) {
    
    const router = useRouter()
    const [canSubmit, setCanSubmit] = useState(false)
    const initialState = {
        name: '',
        username: '',
        bio: '',
        website: '',
    }

    const checkIfUsernameExists = async(username) => {
        const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        if (data){
            console.log(data)
            return true
        }
        if (error){
            console.log(error)
            throw error
        }
    }

    //create a function that runs after the username  is changed and no longer in focus, wait 2 seconds, then check if the username exists
    //if it does, set the state to false, if it doesn't, set the state to true



    const handleCanSubmit = async() => {
        if (state.name.length > 0 && state.username.length > 0){
            setCanSubmit(true)
        } else {
            setCanSubmit(false)
        }
    }

    function formReducer(state, action) {
        return {
          ...state,
          [action.field]: action.value
        };
      }
    const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value
    });
    handleCanSubmit()
  };

  useEffect(() => {
    handleCanSubmit()
    }
    , [state])

    //write a useReducer to handle the form state
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           
            const { data, error } = await supabase
            .from('profiles')
            .update([
                { 
                    full_name: state.name,
                    username: state.username,
                    bio: state.bio,
                    website: state.website,
                },
            ])
            .eq('id', session.user.id)
            .select()

            if (data){
                alert("Profile Created!")
                console.log(data)
                router.reload()
            }
            if (error){
                console.log(error)
                if(error.message === 'new row violates row-level security policy for table "profiles"'){
                alert("Username already exists!")
                } else{
                alert("Error creating profile!")
                }
            }
        } catch (error) {
            throw error
        }
    }
  return (
    <div className={s.container}>
        
        <form onSubmit={(e)=>handleSubmit(e)} className={s.form}>
        <div className={s.forminput}>
                <label className={s.label}>
                    Name
                </label>
                <input className={s.input} value={state.name} onChange={handleChange} type="text" name="name" placeholder="John Smith"/>
            </div>
            <div className={s.forminput}>
                <label className={s.label}>
                    Username
                </label>
                <input className={s.input} value={state.username} onChange={handleChange} type="text" name="username" placeholder="Username"/>
            </div>
            <div className={s.forminput}>
            <label className={s.label}>Bio</label>
            <textarea className={s.textarea} value={state.bio} onChange={handleChange} name="bio" placeholder="Can always complete this later." />
            </div>
            <div className={s.forminput}>
                <label className={s.label}>
                    Website (Optional)
                </label>
                <input className={s.input} value={state.website} onChange={handleChange} name="website" type="text" placeholder="YourWebsite.here"/>
            </div>
            <div className={s.buttoncontainer}>
                <button type="submit" disabled={!canSubmit} className={canSubmit ? s.button : s.disabledbutton}>
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}
