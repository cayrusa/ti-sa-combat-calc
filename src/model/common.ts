export type KeyedDictionary<TKey extends string | number | symbol, TValue> = {
    [key in TKey]: TValue;
};

export type SparseDictionary<TKey extends string | number | symbol, TValue> = {
    [key in TKey]?: TValue;
};

export enum HitType {
    Standard = "standard",
    PreCombat = "preCombat",
    AntiFighterBarrage = "antiFighterBarrage",
    // Yin suicide
    // Creuss splicer
    // Berserker genome
}
