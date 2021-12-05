import {
    blue,
    brown,
    cyan,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    orange,
    purple,
    red,
    yellow,
} from "@mui/material/colors";

import { ParticipantInputTags } from "model/calculation";
import {
    Faction,
    FactionAbility,
    FactionResources,
    FactionUpgrade,
    ParticipantTag,
    ParticipantTagResources,
    ParticipantTagValue,
    Technology,
    TechnologyType,
} from "model/combatTags";
import { KeyedDictionary } from "model/common";
import { getAllEnumValues } from "./common";

export function grantDefaultFactionAbilities(participantTags: ParticipantInputTags, faction: Faction): ParticipantInputTags {
    const newTags: ParticipantInputTags = {
        ...participantTags,
    };
    for (let oldAbility of getAllEnumValues<FactionAbility>(FactionAbility)) {
        delete newTags[oldAbility];
    }
    for (let newAbility of defaultFactionAbilities[faction]) {
        newTags[newAbility] = getDefaultFactionAbilityValue(newAbility);
    }
    return newTags;
}

export const defaultFactionAbilities: KeyedDictionary<Faction, FactionAbility[]> = {
    [Faction.BARONY_OF_LETNEV]: [],
    [Faction.CLAN_OF_SAAR]: [],
    [Faction.EMIRATES_OF_HACAN]: [],
    [Faction.FEDERATION_OF_SOL]: [],
    [Faction.MENTAK_COALITION]: [FactionAbility.MENTAK_PRECOMBAT_SHOTS],
    [Faction.NAALU_COLLECTIVE]: [FactionAbility.NAALU_FIGHTER_MOD],
    [Faction.KROTOAN_VIRUS]: [],
    [Faction.HIVES_OF_SARDAKK_NORR]: [FactionAbility.SARDAKK_UNIT_MOD],
    [Faction.UNIVERSITIES_OF_JOLNAR]: [FactionAbility.JOLNAR_UNIT_MOD, FactionAbility.JOLNAR_REROLL],
    [Faction.WINNU_SOVEREIGNTY]: [],
    [Faction.XXCHA_KINGDOM]: [FactionAbility.XXCHA_ROUND1_MOD],
    [Faction.TRIBES_OF_YSSARIL]: [],
    [Faction.YIN_BROTHERHOOD]: [FactionAbility.YIN_ROUND2_SACRIFICE, FactionAbility.YIN_INVASION_CONVERSION],
    [Faction.EMBERS_OF_MUAAT]: [],
    [Faction.GHOSTS_OF_CREUSS]: [],
    [Faction.LIZIX_MINDNET]: [FactionAbility.LIZIX_DREADNOUGHT_MOD, FactionAbility.LIZIX_GROUND_FORCE_MOD],
    [Faction.ARBOREC_ECOSYSTEM]: [FactionAbility.ARBOREC_GROUND_FORCE_MOD],
    [Faction.ORDER_OF_THE_LAST]: [],
};

export const availableFactionUpgrades: KeyedDictionary<Faction, FactionUpgrade[]> = {
    [Faction.BARONY_OF_LETNEV]: [FactionUpgrade.LETNEV_SAIMOC_INFUSED_HULLS],
    [Faction.CLAN_OF_SAAR]: [FactionUpgrade.SAAR_CHAOS_MAPPING],
    [Faction.EMIRATES_OF_HACAN]: [],
    [Faction.FEDERATION_OF_SOL]: [
        FactionUpgrade.SOL_ADVANCED_FLEET_TACTICS,
        FactionUpgrade.SOL_MARK2_ADVANCED_CARRIERS,
        FactionUpgrade.SOL_VERSATILE_COMBAT_TACTICS,
    ],
    [Faction.MENTAK_COALITION]: [FactionUpgrade.MENTAK_ADAPTABLE_ORDNANCE_RIGS],
    [Faction.NAALU_COLLECTIVE]: [],
    [Faction.KROTOAN_VIRUS]: [],
    [Faction.HIVES_OF_SARDAKK_NORR]: [FactionUpgrade.SARDAKK_BERZERKER_GENOME],
    [Faction.UNIVERSITIES_OF_JOLNAR]: [],
    [Faction.WINNU_SOVEREIGNTY]: [],
    [Faction.XXCHA_KINGDOM]: [FactionUpgrade.XXCHA_ARCHON_ENERGY_SHELL],
    [Faction.TRIBES_OF_YSSARIL]: [],
    [Faction.YIN_BROTHERHOOD]: [FactionUpgrade.YIN_BLADE_OF_ZEAL, FactionUpgrade.YIN_SUBLIMINAL_COMMAND],
    [Faction.EMBERS_OF_MUAAT]: [FactionUpgrade.MUAAT_MAGMUS_REACTOR, FactionUpgrade.MUAAT_MAGMA_OBLITERATOR],
    [Faction.GHOSTS_OF_CREUSS]: [FactionUpgrade.CREUSS_DIMENSIONAL_SPLICER],
    [Faction.LIZIX_MINDNET]: [],
    [Faction.ARBOREC_ECOSYSTEM]: [],
    [Faction.ORDER_OF_THE_LAST]: [FactionUpgrade.ORDER_CHRONOS_FIELD],
};

export function getDefaultFactionAbilityValue<T extends ParticipantTag>(factionAbility: T): any {
    switch (factionAbility) {
        case FactionAbility.JOLNAR_REROLL:
            return JOLNAR_REROLL_DEFAULT;
        default:
            return true;
    }
}

const JOLNAR_REROLL_DEFAULT: ParticipantTagValue<FactionAbility.JOLNAR_REROLL> = {
    maxRerolls: 0,
    combatValueBreakpoint: 7,
};

export const factionResources: KeyedDictionary<Faction, FactionResources> = {
    [Faction.BARONY_OF_LETNEV]: { name: "The Barony of Letnev", color: grey[700] },
    [Faction.CLAN_OF_SAAR]: { name: "The Clan of Saar", color: brown[500] },
    [Faction.EMIRATES_OF_HACAN]: { name: "The Emirates of Hacan", color: yellow[600] },
    [Faction.FEDERATION_OF_SOL]: { name: "The Federation of Sol", color: blue[600] },
    [Faction.MENTAK_COALITION]: { name: "The Mentak Coalition", color: orange[600] },
    [Faction.NAALU_COLLECTIVE]: { name: "The Naalu Collective", color: orange[200] },
    [Faction.KROTOAN_VIRUS]: { name: "The Krotoan Virus", color: red["A700"] },
    [Faction.HIVES_OF_SARDAKK_NORR]: { name: "The Hives of Sardakk N'orr", color: red[600] },
    [Faction.UNIVERSITIES_OF_JOLNAR]: { name: "The Unitversities of Jol-Nar", color: purple[500] },
    [Faction.WINNU_SOVEREIGNTY]: { name: "The Winnu Sovereignty", color: deepPurple[600] },
    [Faction.XXCHA_KINGDOM]: { name: "The Xxcha Kingdom", color: lightGreen[700] },
    [Faction.TRIBES_OF_YSSARIL]: { name: "The Tribes of Yssaril", color: green[700] },
    [Faction.YIN_BROTHERHOOD]: { name: "The Yin Brotherhood", color: grey[400] },
    [Faction.EMBERS_OF_MUAAT]: { name: "The Embers of Muaat", color: red[800] },
    [Faction.GHOSTS_OF_CREUSS]: { name: "The Ghosts of Creuss", color: lightBlue[400] },
    [Faction.LIZIX_MINDNET]: { name: "The L1z1x Mindnet", color: indigo[600] },
    [Faction.ARBOREC_ECOSYSTEM]: { name: "The Arborec Ecosystem", color: lightGreen[400] },
    [Faction.ORDER_OF_THE_LAST]: { name: "The Order of the Last", color: cyan[700] },
};

export const technologyColors: KeyedDictionary<TechnologyType, string> = {
    [TechnologyType.BLUE]: blue[300],
    [TechnologyType.GREEN]: green[500],
    [TechnologyType.RED]: red[500],
    [TechnologyType.YELLOW]: yellow[600],
};

export const participantTagResources: KeyedDictionary<ParticipantTag, ParticipantTagResources> = {
    [FactionAbility.MENTAK_PRECOMBAT_SHOTS]: {
        name: "Pre-combat shots",
        color: factionResources[Faction.MENTAK_COALITION].color,
        implemented: false,
    },
    [FactionAbility.NAALU_FIGHTER_MOD]: {
        name: "Fighters +1",
        color: factionResources[Faction.NAALU_COLLECTIVE].color,
        implemented: false,
    },
    [FactionAbility.SARDAKK_UNIT_MOD]: {
        name: "All units +1",
        color: factionResources[Faction.HIVES_OF_SARDAKK_NORR].color,
        implemented: false,
    },
    [FactionAbility.JOLNAR_UNIT_MOD]: {
        name: "All units -1",
        color: factionResources[Faction.UNIVERSITIES_OF_JOLNAR].color,
        implemented: false,
    },
    [FactionAbility.JOLNAR_REROLL]: {
        name: "Reroll enemy rolls",
        color: factionResources[Faction.UNIVERSITIES_OF_JOLNAR].color,
        implemented: false,
    },
    [FactionAbility.XXCHA_ROUND1_MOD]: {
        name: "Round 1: Enemy units -1",
        color: factionResources[Faction.XXCHA_KINGDOM].color,
        implemented: false,
    },
    [FactionAbility.YIN_ROUND2_SACRIFICE]: {
        name: "Round 2: Sacrifice unit",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implemented: false,
    },
    [FactionAbility.YIN_INVASION_CONVERSION]: {
        name: "Convert ground force",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implemented: false,
    },
    [FactionAbility.LIZIX_DREADNOUGHT_MOD]: {
        name: "Dreadnoughts +1",
        color: factionResources[Faction.LIZIX_MINDNET].color,
        implemented: false,
    },
    [FactionAbility.LIZIX_GROUND_FORCE_MOD]: {
        name: "Ground forces +1 (+2 with MU)",
        color: factionResources[Faction.LIZIX_MINDNET].color,
        implemented: false,
    },
    [FactionAbility.ARBOREC_GROUND_FORCE_MOD]: {
        name: "Ground forces -1",
        color: factionResources[Faction.ARBOREC_ECOSYSTEM].color,
        implemented: false,
    },
    [FactionUpgrade.LETNEV_SAIMOC_INFUSED_HULLS]: {
        name: "Saimoc-infused hulls",
        color: factionResources[Faction.BARONY_OF_LETNEV].color,
        implemented: false,
    },
    [FactionUpgrade.SAAR_CHAOS_MAPPING]: { name: "Chaos mapping", color: factionResources[Faction.CLAN_OF_SAAR].color, implemented: false },
    [FactionUpgrade.SOL_ADVANCED_FLEET_TACTICS]: {
        name: "Advanced fleet tactics",
        color: factionResources[Faction.FEDERATION_OF_SOL].color,
        implemented: false,
    },
    [FactionUpgrade.SOL_MARK2_ADVANCED_CARRIERS]: {
        name: "Mark II advanced carriers",
        color: factionResources[Faction.FEDERATION_OF_SOL].color,
        implemented: false,
    },
    [FactionUpgrade.SOL_VERSATILE_COMBAT_TACTICS]: {
        name: "Versatile combat tactics",
        color: factionResources[Faction.FEDERATION_OF_SOL].color,
        implemented: false,
    },
    [FactionUpgrade.MENTAK_ADAPTABLE_ORDNANCE_RIGS]: {
        name: "Adaptable ordnance rigs",
        color: factionResources[Faction.MENTAK_COALITION].color,
        implemented: false,
    },
    [FactionUpgrade.SARDAKK_BERZERKER_GENOME]: {
        name: "Berzerker genome",
        color: factionResources[Faction.HIVES_OF_SARDAKK_NORR].color,
        implemented: false,
    },
    [FactionUpgrade.XXCHA_ARCHON_ENERGY_SHELL]: {
        name: "Archon energy shells",
        color: factionResources[Faction.XXCHA_KINGDOM].color,
        implemented: false,
    },
    [FactionUpgrade.YIN_BLADE_OF_ZEAL]: {
        name: "Blade of zeal",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implemented: false,
    },
    [FactionUpgrade.YIN_SUBLIMINAL_COMMAND]: {
        name: "Subliminal command",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implemented: false,
    },
    [FactionUpgrade.MUAAT_MAGMUS_REACTOR]: {
        name: "Magmus reactor",
        color: factionResources[Faction.EMBERS_OF_MUAAT].color,
        implemented: false,
    },
    [FactionUpgrade.MUAAT_MAGMA_OBLITERATOR]: {
        name: "Magma obliterator",
        color: factionResources[Faction.EMBERS_OF_MUAAT].color,
        implemented: false,
    },
    [FactionUpgrade.CREUSS_DIMENSIONAL_SPLICER]: {
        name: "Dimensional splicer",
        color: factionResources[Faction.GHOSTS_OF_CREUSS].color,
        implemented: false,
    },
    [FactionUpgrade.ORDER_CHRONOS_FIELD]: {
        name: "Chronos field",
        color: factionResources[Faction.ORDER_OF_THE_LAST].color,
        implemented: false,
    },
    [Technology.HYLAR_V_LASER]: { name: "Hylar V laser", color: technologyColors[TechnologyType.RED], implemented: false },
    [Technology.IMPULSION_SHIELDS]: { name: "Impulsion shields", color: technologyColors[TechnologyType.RED], implemented: false },
    [Technology.AUTOMATED_TURRETS]: { name: "Automated turrets", color: technologyColors[TechnologyType.RED], implemented: false },
    [Technology.WAR_SUN]: { name: "War sun", color: technologyColors[TechnologyType.RED], implemented: false },
    [Technology.GRAVITON_NETAGOR]: { name: "Graviton negator", color: technologyColors[TechnologyType.RED], implemented: false },
    [Technology.MAGEN_DEFENSE_GRID]: { name: "Magen defense grid", color: technologyColors[TechnologyType.RED], implemented: false },
    [Technology.ASSAULT_CANNONS]: { name: "Assault cannons", color: technologyColors[TechnologyType.RED], implemented: false },
    [Technology.GRAVITON_LASER_SYSTEM]: {
        name: "Graviton laser system",
        color: technologyColors[TechnologyType.YELLOW],
        implemented: false,
    },
    [Technology.CYBERNETICS]: { name: "Cybernetics", color: technologyColors[TechnologyType.GREEN], implemented: false },
    [Technology.GEN_SYNTHESIS]: { name: "Gen synthesis", color: technologyColors[TechnologyType.GREEN], implemented: false },
    [Technology.DACXIVE_ANIMATORS]: { name: "Dacxive animators", color: technologyColors[TechnologyType.GREEN], implemented: false },
    [Technology.X89_BACTERIAL_WEAPON]: { name: "X-89 bacterial weapon", color: technologyColors[TechnologyType.GREEN], implemented: false },
    [Technology.ADVANCED_FIGHTERS]: { name: "Advanced fighters", color: technologyColors[TechnologyType.BLUE], implemented: false },
    [Technology.MANEUVERING_JETS]: { name: "Maneuvering jets", color: technologyColors[TechnologyType.BLUE], implemented: false },
};
