import moment from 'moment';

export const validateNome = (text) => {
    return !!text && text.length >= 2;
}

export const validateEmail = (text) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text.toLowerCase());
}

export const validateSenha = (text) => {
    return !!text && text.length >= 6 && text.length <= 8;
}

export const validateCPF = (text = '') => {
    const cpf = text.replace(/[^0-9]/g, '');
    return !!cpf && cpf.length === 11;
}

export const validateNascimento = (text) => {
    return moment(text, 'DD/MM/YYYY', true).isValid();
}

export const isFormValid = (refs) => {
    return Object.keys(refs) // ['nome', 'email', 'senha', ...]
        .map(key => refs[key])
        // [Input('nome'), Input('email'), Button(Cancelar), Input('senha'), ...
        .filter(comp => !!comp.isValid)
        // [Input('nome'), Input('email'), Input('senha'), ...
        .reduce((formValid, input) => input.isValid() && formValid, true);
}
