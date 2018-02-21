import VMasker from 'vanilla-masker';

export const maskCPF = (text) => {
    return VMasker.toPattern(text, '999.999.999-99');
}
