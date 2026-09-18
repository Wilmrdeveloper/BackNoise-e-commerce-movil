import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const USERS_KEY = 'bn_users';
const SESSION_KEY = 'bn_session';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    register(user: User): { success: boolean; message: string } {
        const users = this.getUsers();

        const exists = users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (exists) {
            return { success: false, message: 'Ya existe una cuenta con este email.' };
        }

        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return { success: true, message: 'Registro exitoso.' };
    }

    login(email: string, password: string): { success: boolean; message: string } {
        const users = this.getUsers();
        const found = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!found) {
            return { success: false, message: 'Email o contraseña incorrectos.' };
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify(found));
        return { success: true, message: 'Sesión iniciada.' };
    }

    logout(): void {
        localStorage.removeItem(SESSION_KEY);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(SESSION_KEY);
    }

    getCurrentUser(): User | null {
        const session = localStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    }

    private getUsers(): User[] {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    }
}