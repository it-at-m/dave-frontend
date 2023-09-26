export default class BerechnungsMatrix {
    private _a: number | undefined;
    private _b: number | undefined;
    private _c: number | undefined;
    private _d: number | undefined;
    private _e: number | undefined;
    private _f: number | undefined;

    constructor(
        a: number | undefined,
        b: number | undefined,
        c: number | undefined,
        d: number | undefined,
        e: number | undefined,
        f: number | undefined
    ) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
    }

    get a(): number | undefined {
        return this._a;
    }

    get b(): number | undefined {
        return this._b;
    }

    get c(): number | undefined {
        return this._c;
    }

    get d(): number | undefined {
        return this._d;
    }

    get e(): number | undefined {
        return this._e;
    }

    get f(): number | undefined {
        return this._f;
    }
}
