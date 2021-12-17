import { blue, green, red, yellow } from "@mui/material/colors";

import { CombatStage, CombatStageResources, ParticipantInputTags, ParticipantRole, RichUnit } from "model/calculation";
import {
    Faction,
    FactionAbility,
    FactionResources,
    FactionUpgrade,
    JolnarRerollStrategy,
    ParticipantTag,
    ParticipantTagResources,
    Technology,
    TechnologyResources,
    TechnologyType,
} from "model/combatTags";
import { KeyedDictionary } from "model/common";
import { allUnitTypes, unitDefinitions, UnitType } from "model/unit";
import { getAllEnumValues } from "./common";
import * as effects from "./effects";

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

export const unitSizes: KeyedDictionary<UnitType, number> = Object.fromEntries(
    allUnitTypes.map((type: UnitType) => [type, unitDefinitions[type].imageWidth * unitDefinitions[type].imageHeight])
) as KeyedDictionary<UnitType, number>;

export function unitSizeComparer(a: RichUnit, b: RichUnit): number {
    return unitSizes[b.input.type] - unitSizes[a.input.type];
}

export function getOpponentRole(role: ParticipantRole): ParticipantRole {
    return role === ParticipantRole.Attacker ? ParticipantRole.Defender : ParticipantRole.Attacker;
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

const JOLNAR_REROLL_DEFAULT: JolnarRerollStrategy = {
    maxRerolls: 0,
    combatValueBreakpoint: 7,
};

export const factionResources: KeyedDictionary<Faction, FactionResources> = {
    [Faction.BARONY_OF_LETNEV]: { name: "The Barony of Letnev", color: "#909090" },
    [Faction.CLAN_OF_SAAR]: { name: "The Clan of Saar", color: "#603C1C" },
    [Faction.EMIRATES_OF_HACAN]: { name: "The Emirates of Hacan", color: "#F2DA30" },
    [Faction.FEDERATION_OF_SOL]: { name: "The Federation of Sol", color: "#0061C2" },
    [Faction.MENTAK_COALITION]: { name: "The Mentak Coalition", color: "#E17E20" },
    [Faction.NAALU_COLLECTIVE]: { name: "The Naalu Collective", color: "#AF8F60" },
    [Faction.KROTOAN_VIRUS]: { name: "The Krotoan Virus", color: "#4C181A" },
    [Faction.HIVES_OF_SARDAKK_NORR]: { name: "The Hives of Sardakk N'orr", color: "#D00002" },
    [Faction.UNIVERSITIES_OF_JOLNAR]: { name: "The Unitversities of Jol-Nar", color: "#8F36AC" },
    [Faction.WINNU_SOVEREIGNTY]: { name: "The Winnu Sovereignty", color: "#6051A4" },
    [Faction.XXCHA_KINGDOM]: { name: "The Xxcha Kingdom", color: "#388F2E" },
    [Faction.TRIBES_OF_YSSARIL]: { name: "The Tribes of Yssaril", color: "#0A4201" },
    [Faction.YIN_BROTHERHOOD]: { name: "The Yin Brotherhood", color: "#FAFAFA" },
    [Faction.EMBERS_OF_MUAAT]: { name: "The Embers of Muaat", color: "#820C00" },
    [Faction.GHOSTS_OF_CREUSS]: { name: "The Ghosts of Creuss", color: "#4EA8CA" },
    [Faction.LIZIX_MINDNET]: { name: "The L1z1x Mindnet", color: "#000CA6" },
    [Faction.ARBOREC_ECOSYSTEM]: { name: "The Arborec Ecosystem", color: "#857A10" },
    [Faction.ORDER_OF_THE_LAST]: { name: "The Order of the Last", color: "#107273" },
};

export const technologyColors: KeyedDictionary<TechnologyType, string> = {
    [TechnologyType.BLUE]: blue[300],
    [TechnologyType.GREEN]: green[500],
    [TechnologyType.RED]: red[500],
    [TechnologyType.YELLOW]: yellow[600],
};

export const technologyResources: KeyedDictionary<Technology, TechnologyResources> = {
    [Technology.HYLAR_V_LASER]: {
        name: "Hylar V laser",
        color: technologyColors[TechnologyType.RED],
        type: TechnologyType.RED,
        implementation: effects.hylarVLaser,
    },
    [Technology.IMPULSION_SHIELDS]: {
        name: "Impulsion shields",
        color: technologyColors[TechnologyType.RED],
        type: TechnologyType.RED,
        implementation: false,
    },
    [Technology.AUTOMATED_TURRETS]: {
        name: "Automated turrets",
        color: technologyColors[TechnologyType.RED],
        type: TechnologyType.RED,
        implementation: effects.automatedTurrets,
    },
    [Technology.WAR_SUN]: { name: "War sun", color: technologyColors[TechnologyType.RED], type: TechnologyType.RED, implementation: false },
    [Technology.GRAVITON_NETAGOR]: {
        name: "Graviton negator",
        color: technologyColors[TechnologyType.RED],
        type: TechnologyType.RED,
        implementation: false,
    },
    [Technology.MAGEN_DEFENSE_GRID]: {
        name: "Magen defense grid",
        color: technologyColors[TechnologyType.RED],
        type: TechnologyType.RED,
        implementation: false,
    },
    [Technology.ASSAULT_CANNONS]: {
        name: "Assault cannons",
        color: technologyColors[TechnologyType.RED],
        type: TechnologyType.RED,
        implementation: effects.assaultCannons,
    },
    [Technology.GRAVITON_LASER_SYSTEM]: {
        name: "Graviton laser system",
        color: technologyColors[TechnologyType.YELLOW],
        type: TechnologyType.YELLOW,
        implementation: false,
    },
    [Technology.CYBERNETICS]: {
        name: "Cybernetics",
        color: technologyColors[TechnologyType.GREEN],
        type: TechnologyType.GREEN,
        implementation: effects.cybernetics,
    },
    [Technology.GEN_SYNTHESIS]: {
        name: "Gen synthesis",
        color: technologyColors[TechnologyType.GREEN],
        type: TechnologyType.GREEN,
        implementation: false,
    },
    [Technology.DACXIVE_ANIMATORS]: {
        name: "Dacxive animators",
        color: technologyColors[TechnologyType.GREEN],
        type: TechnologyType.GREEN,
        implementation: false,
    },
    [Technology.X89_BACTERIAL_WEAPON]: {
        name: "X-89 bacterial weapon",
        color: technologyColors[TechnologyType.GREEN],
        type: TechnologyType.GREEN,
        implementation: false,
    },
    [Technology.ADVANCED_FIGHTERS]: {
        name: "Advanced fighters",
        color: technologyColors[TechnologyType.BLUE],
        type: TechnologyType.BLUE,
        implementation: effects.advancedFighters,
    },
    [Technology.MANEUVERING_JETS]: {
        name: "Maneuvering jets",
        color: technologyColors[TechnologyType.BLUE],
        type: TechnologyType.BLUE,
        implementation: false,
    },
};

export const participantTagResources: KeyedDictionary<ParticipantTag, ParticipantTagResources> = {
    [FactionAbility.MENTAK_PRECOMBAT_SHOTS]: {
        name: "Pre-combat shots",
        color: factionResources[Faction.MENTAK_COALITION].color,
        implementation: effects.mentakPreCombatShots,
    },
    [FactionAbility.NAALU_FIGHTER_MOD]: {
        name: "Fighters +1",
        color: factionResources[Faction.NAALU_COLLECTIVE].color,
        implementation: effects.naaluFighterMod,
    },
    [FactionAbility.SARDAKK_UNIT_MOD]: {
        name: "All units +1",
        color: factionResources[Faction.HIVES_OF_SARDAKK_NORR].color,
        implementation: effects.sardakkUnitMod,
    },
    [FactionAbility.JOLNAR_UNIT_MOD]: {
        name: "All units -1",
        color: factionResources[Faction.UNIVERSITIES_OF_JOLNAR].color,
        implementation: effects.jolnarUnitMod,
    },
    [FactionAbility.JOLNAR_REROLL]: {
        name: "Reroll enemy rolls",
        color: factionResources[Faction.UNIVERSITIES_OF_JOLNAR].color,
        implementation: false,
    },
    [FactionAbility.XXCHA_ROUND1_MOD]: {
        name: "Round 1: Enemy units -1",
        color: factionResources[Faction.XXCHA_KINGDOM].color,
        implementation: effects.xxchaRound1Mod,
    },
    [FactionAbility.YIN_ROUND2_SACRIFICE]: {
        name: "Round 2: Sacrifice unit",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implementation: false,
    },
    [FactionAbility.YIN_INVASION_CONVERSION]: {
        name: "Convert ground force",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implementation: false,
    },
    [FactionAbility.LIZIX_DREADNOUGHT_MOD]: {
        name: "Dreadnoughts +1",
        color: factionResources[Faction.LIZIX_MINDNET].color,
        implementation: effects.lizixDreadnoughtMod,
    },
    [FactionAbility.LIZIX_GROUND_FORCE_MOD]: {
        name: "Ground forces +1 (+2 with MU)",
        color: factionResources[Faction.LIZIX_MINDNET].color,
        implementation: false,
    },
    [FactionAbility.ARBOREC_GROUND_FORCE_MOD]: {
        name: "Ground forces -1",
        color: factionResources[Faction.ARBOREC_ECOSYSTEM].color,
        implementation: false,
    },
    [FactionUpgrade.LETNEV_SAIMOC_INFUSED_HULLS]: {
        name: "Saimoc-infused hulls",
        color: factionResources[Faction.BARONY_OF_LETNEV].color,
        implementation: false,
    },
    [FactionUpgrade.SAAR_CHAOS_MAPPING]: {
        name: "Chaos mapping",
        color: factionResources[Faction.CLAN_OF_SAAR].color,
        implementation: effects.saarChaosMapping,
    },
    [FactionUpgrade.SOL_ADVANCED_FLEET_TACTICS]: {
        name: "Advanced fleet tactics",
        color: factionResources[Faction.FEDERATION_OF_SOL].color,
        implementation: effects.solAdvancedFleetTactics,
    },
    [FactionUpgrade.SOL_MARK2_ADVANCED_CARRIERS]: {
        name: "Mark II advanced carriers",
        color: factionResources[Faction.FEDERATION_OF_SOL].color,
        implementation: effects.solMark2AdvancedCarriers,
    },
    [FactionUpgrade.SOL_VERSATILE_COMBAT_TACTICS]: {
        name: "Versatile combat tactics",
        color: factionResources[Faction.FEDERATION_OF_SOL].color,
        implementation: false,
    },
    [FactionUpgrade.MENTAK_ADAPTABLE_ORDNANCE_RIGS]: {
        name: "Adaptable ordnance rigs",
        color: factionResources[Faction.MENTAK_COALITION].color,
        implementation: false,
    },
    [FactionUpgrade.SARDAKK_BERZERKER_GENOME]: {
        name: "Berzerker genome",
        color: factionResources[Faction.HIVES_OF_SARDAKK_NORR].color,
        implementation: false,
    },
    [FactionUpgrade.XXCHA_ARCHON_ENERGY_SHELL]: {
        name: "Archon energy shells",
        color: factionResources[Faction.XXCHA_KINGDOM].color,
        implementation: false,
    },
    [FactionUpgrade.YIN_BLADE_OF_ZEAL]: {
        name: "Blade of zeal",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implementation: false,
    },
    [FactionUpgrade.YIN_SUBLIMINAL_COMMAND]: {
        name: "Subliminal command",
        color: factionResources[Faction.YIN_BROTHERHOOD].color,
        implementation: false,
    },
    [FactionUpgrade.MUAAT_MAGMUS_REACTOR]: {
        name: "Magmus reactor",
        color: factionResources[Faction.EMBERS_OF_MUAAT].color,
        implementation: false,
    },
    [FactionUpgrade.MUAAT_MAGMA_OBLITERATOR]: {
        name: "Magma obliterator",
        color: factionResources[Faction.EMBERS_OF_MUAAT].color,
        implementation: false,
    },
    [FactionUpgrade.CREUSS_DIMENSIONAL_SPLICER]: {
        name: "Dimensional splicer",
        color: factionResources[Faction.GHOSTS_OF_CREUSS].color,
        implementation: false,
    },
    [FactionUpgrade.ORDER_CHRONOS_FIELD]: {
        name: "Chronos field",
        color: factionResources[Faction.ORDER_OF_THE_LAST].color,
        implementation: false,
    },
    ...technologyResources,
};

export const combatStageResources: KeyedDictionary<CombatStage, CombatStageResources> = {
    [CombatStage.SpaceMines]: { name: "Space mines", shortName: "Mines" },
    [CombatStage.PDS]: { name: "PDS fire", shortName: "PDS" },
    [CombatStage.StartOfBattle]: { name: "Start of battle", shortName: "Start" },
    [CombatStage.AntiFighterBarrage]: { name: "Anti-fighter barrage", shortName: "AFB" },
    [CombatStage.PreCombat]: { name: "Pre-combat abilities", shortName: "Pre-combat" },
    [CombatStage.Round1]: { name: "Round 1", shortName: "Round 1" },
    [CombatStage.Round2]: { name: "Round 2", shortName: "Round 2" },
    [CombatStage.RoundN]: { name: "Round N", shortName: "Combat" },
};
