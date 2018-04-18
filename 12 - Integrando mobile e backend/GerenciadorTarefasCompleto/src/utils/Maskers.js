import VMasker from 'vanilla-masker';

export const maskCPF = (text) => {
    return VMasker.toPattern(text, '999.999.999-99');
}

export const maskDate = (text) => {
    return VMasker.toPattern(text, '99/99/9999');
}
