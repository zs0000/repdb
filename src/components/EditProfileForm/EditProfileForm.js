import React, { use, useEffect, useReducer, useState } from 'react'
import s from './EditProfileForm.module.css'
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
export default function EditProfileForm({user, userId}) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter()
  const initialState = {
    username: user.username || '',
    full_name: user.full_name || '',
    email: user.email || '',
    website: user.website || '',
    bio: user.bio || '', 
  };
  
  const [form, updateForm] = useReducer(
    (data, partialData) => ({ ...data, ...partialData }),
    initialState
  );
  
  const { username, full_name, bio, website } = form;
    
  const handleInputChange = (name) => (e) => {
    updateForm({ [name]: e.target.value });
  };

  const getUpdatedFields = () => {
    const updatedFields = {};
    for (const key in form) {
      if (form[key] !== initialState[key]) {
        updatedFields[key] = form[key];
      }
    }
    return updatedFields;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = getUpdatedFields();
      if (Object.keys(updatedData).length > 0) {
        setButtonDisabled(true);
        const { data, error, status } = await supabase
          .from('profiles')
          .update(updatedData)
          .eq('id', userId);
        if (error) {
          setButtonDisabled(false);
          throw new Error(error.message);
        } else{
          alert('Profile updated successfully');
          router.push('/profile');
        }
      }
    } catch (error) {
      alert(error.message);
    } 
  };

  const checkIfFormChanged = () => {
    for (const key in form) {
      if (form[key] !== initialState[key]) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    const formChanged = checkIfFormChanged();
    if (formChanged) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }
  , [form]);



  return (
    <div className={s.container}>
        <form className={s.form} onSubmit={handleSubmit}>
                        <div className={s.imagecontainer}>
                        </div>
                        <div className={s.inputcontainer}>
                          <span className={s.inputlabel}>
                            Name
                          </span>
                          <input type="text" placeholder={user.full_name ? user.full_name : "Full name"} value={full_name} onChange={handleInputChange('full_name')} className={s.input} />
                        </div>
                        <div className={s.inputcontainer}>
                        <span className={s.inputlabel}>
                            Username
                          </span>
                          <input type="text" placeholder={user.username ? user.username : "Username"} value={username} onChange={handleInputChange('username')} className={s.input} />
                        </div>
                        <div className={s.biocontainer}>
                        <span className={s.inputlabel}>
                            Bio
                          </span>
                        <textarea type="text" placeholder={user.bio ? user.bio : "bio"} value={bio} onChange={handleInputChange('bio')} className={s.textarea} />
                        </div>
                        <div className={s.inputcontainer}>
                        <span className={s.inputlabel}>
                            Website
                          </span>
                          <input type="text" placeholder={user.website ? user.website : "Website"} value={website} onChange={handleInputChange('website')} className={s.input} />
                        </div>
                        <div className={s.socialscontainer}>
                        <div className={s.social}>
                          {/*Placeholder for socials*/}
                        </div>
                        <div className={s.social}>
                          {/*Placeholder for socials*/}
                        </div>
                        <div className={s.social}>
                          {/*Placeholder for socials*/}
                        </div>
                        <div className={s.social}>
                          {/*Placeholder for socials*/}
                        </div>
                        </div>
                        <div className={s.buttoncontainer}>
                          <button disabled={buttonDisabled} className={buttonDisabled === false ?  s.button : s.disabledbutton} type='submit'>
                            Submit
                          </button>
                        </div>
                    </form>
    </div>
  )
}
