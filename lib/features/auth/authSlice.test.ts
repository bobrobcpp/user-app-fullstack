// @ts-nocheck
import { authSlice, AuthSliceState } from './authSlice';

describe('authSlice', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            user: null,
            status: 'idle',
        };
    });

    it('should handle registerUser.pending', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.registerUser.pending());
        expect(state.status).toBe('loading');
    });

    it('should handle registerUser.fulfilled', () => {
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            id: '1234',
        };
        const state = authSlice.reducer(
            initialState,
            authSlice.actions.registerUser.fulfilled(userData)
        );
        expect(state.user).toEqual({ ...userData });
        expect(state.status).toBe('idle');
    });

    it('should handle registerUser.rejected', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.registerUser.rejected());
        expect(state.status).toBe('failed');
    });

    it('should handle loginUser.pending', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.loginUser.pending());
        expect(state.status).toBe('loading');
    });

    it('should handle loginUser.fulfilled', () => {
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            id: '1234',
        };
        const state = authSlice.reducer(initialState, authSlice.actions.loginUser.fulfilled(userData));
        expect(state.user).toEqual({ ...userData });
        expect(state.status).toBe('idle');
    });

    it('should handle loginUser.rejected', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.loginUser.rejected());
        expect(state.status).toBe('failed');
    });

    it('should handle getUser.pending', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.getUser.pending());
        expect(state.status).toBe('loading');
    });

    it('should handle getUser.fulfilled', () => {
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            id: '1234',
        };
        const state = authSlice.reducer(initialState, authSlice.actions.getUser.fulfilled(userData));
        expect(state.user).toEqual({ ...userData });
        expect(state.status).toBe('idle');
    });

    it('should handle getUser.rejected', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.getUser.rejected());
        expect(state.status).toBe('failed');
    });

    it('should handle signOut.pending', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.signOut.pending());
        expect(state.status).toBe('loading');
    });

    it('should handle signOut.fulfilled', () => {
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            id: '1234',
        };
        const state = authSlice.reducer(initialState, authSlice.actions.signOut.fulfilled(userData));
        expect(state.user).toEqual({ ...userData });
        expect(state.status).toBe('idle');
    });

    it('should handle signOut.rejected', () => {
        const state = authSlice.reducer(initialState, authSlice.actions.signOut.rejected());
        expect(state.status).toBe('failed');
    });
});