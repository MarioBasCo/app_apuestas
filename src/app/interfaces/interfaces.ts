export interface IBanco {
    id:         number;
    nombre_bco: string;
    estado:     boolean;
}

export interface ITipoCta {
    id:          number;
    detalle_cta: string;
    estado:      boolean;
}

export interface ICompeticion {
    id:          number;
    competicion: string;
    estado:      boolean;
}

export interface IEquipo {
    id:            number;
    nombre_equipo: string;
    estado:        boolean;
}

export interface IPartido {
    id:               number;
    id_local:         number;
    equipo_local:     string;
    id_visitante:     number;
    equipo_visitante: string;
    fecha:            string;
    hora:             string;
    id_competicion:   number;
    competicion:      string;
    id_estado:        number;
    estado:           boolean;
}

export interface IDetalleApuesta {
    id:         number;
    id_partido: number;
    id_ganador: number | null;
    nombre:     string;
    monto_inv:  number;
    estado:     number;
}


export interface IUsuario {
    id:         number;
    usuario:    string;
    id_perfil:  number;
    correo:     string;
    ci?:        string;
    nombres?:   string;
    apellidos?: string;
    direccion?: string;
    celular?:   string;
}


