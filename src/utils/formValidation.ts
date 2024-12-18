// Validation functions
export const validateName = (name: string): string | undefined => {
    if (!name) return 'Name is required.';
    if (name !== 'emilys') return 'Invalid username. Only emilys is allowed.';
    return undefined;
};

export const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required.';
    if (!emailRegex.test(email)) return 'Invalid email format.';
    return undefined;
};

export const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    return undefined;
};
