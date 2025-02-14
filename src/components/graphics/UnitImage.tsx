import React from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";

import { factionResources } from "logic/participant";
import { toBrighterHue, toDarkerHue } from "logic/styling";
import { ParticipantRole } from "model/calculation";
import { Faction } from "model/combatTags";
import { Dimensions, UnitDefinition, unitDefinitions, UnitType } from "model/unit";

interface Props {
    unitType: UnitType;
    faction: Faction;
    role: ParticipantRole;
    scale: number;
    badges: (JSX.Element | false)[];
}

export const UnitImage = React.memo(({ unitType, faction, role, scale, badges }: Props) => {
    const [loaded, setLoaded] = React.useState(false);
    const handleLoaded = () => setLoaded(true);
    const path = getSvgPath(unitType);
    const baseColor: string = factionResources[faction].color;
    const darkColor: string = toDarkerHue(baseColor, 0.3);
    const brightColor: string = toBrighterHue(baseColor, 0.05);
    const unitDef: UnitDefinition = unitDefinitions[unitType];

    // Let the image load before showing it, to prevent flickers while the SvgProxys are being handled
    return (
        <div
            style={{
                position: "relative",
                visibility: loaded ? "visible" : "hidden",
            }}
        >
            <SvgLoader path={path} onSVGReady={handleLoaded}>
                <SvgProxy selector="svg" width="100%" height="100%" />
                {role === ParticipantRole.Defender && <SvgProxy selector="g" transform="scale(-1, 1) translate(-100, 0)" />}
                <SvgProxy selector="#color-primary" fill={baseColor} />
                <SvgProxy selector="#color-darker" fill={darkColor} />
                <SvgProxy selector="#color-brighter" fill={brightColor} />
            </SvgLoader>
            <BadgeContainer role={role} scale={scale} anchor={unitDef.imageBadgeAnchor}>
                {badges
                    .filter((badge: JSX.Element | false): badge is JSX.Element => !!badge)
                    .map((badge: JSX.Element) =>
                        React.cloneElement(badge, {
                            style: { float: role === ParticipantRole.Attacker ? "left" : "right", width: "min(30px, 50%)" },
                        })
                    )}
            </BadgeContainer>
        </div>
    );
});

function getSvgPath(unitType: UnitType): string {
    const base = process.env.PUBLIC_URL;
    const subfolder = "images/units";
    let imageName: string;
    switch (unitType) {
        case UnitType.WarSun:
            imageName = "warsun.svg";
            break;
        case UnitType.Dreadnought:
            imageName = "dreadnought.svg";
            break;
        case UnitType.Cruiser:
            imageName = "cruiser.svg";
            break;
        case UnitType.Destroyer:
            imageName = "destroyer.svg";
            break;
        case UnitType.Carrier:
            imageName = "carrier.svg";
            break;
        case UnitType.Fighter:
            imageName = "fighter.svg";
            break;
        case UnitType.Flagship:
            imageName = "flagship.svg";
            break;
        case UnitType.Mech:
            imageName = "mech.svg";
            break;
        case UnitType.GroundForce:
            imageName = "groundforce.svg";
            break;
        case UnitType.ShockTroop:
            imageName = "shocktroop.svg";
            break;
        case UnitType.PDS:
            imageName = "pds.svg";
            break;
    }
    return `${base}/${subfolder}/${imageName}`;
}

interface BadgeContainerProps {
    role: ParticipantRole;
    scale: number;
    anchor: Dimensions;
    children: React.ReactNode;
}

function BadgeContainer({ role, scale, anchor, children }: BadgeContainerProps) {
    return (
        <div
            style={{
                position: "absolute",
                left: role === ParticipantRole.Attacker ? anchor.x * scale : 0,
                bottom: anchor.y * scale,
                right: role === ParticipantRole.Defender ? anchor.x * scale : 0,
            }}
        >
            {children}
        </div>
    );
}
