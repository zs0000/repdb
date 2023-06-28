import React, { createContext, useState, useEffect } from 'react';
import { supabase } from "@/lib/supabaseClient";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // fetch session on initial render
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) console.error(error);
            else setSession(data);
        }

        fetchSession();

        // Listen for changes in authentication state
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}
