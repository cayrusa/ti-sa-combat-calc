import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Tooltip, Typography } from "@mui/material";
import { round } from "lodash";
import { useState } from "react";

import { combatStageResources } from "logic/participant";
import {
    CalculationOutput,
    CombatStage,
    CombatStageOutput,
    CombatStageParticipantStatistics,
    ParticipantInput,
    ParticipantRole,
} from "model/calculation";
import { KeyedDictionary } from "model/common";
import { ResultPercentageBars } from "./ResultPercentageBars";
import { ResultPercentageLabels } from "./ResultPercentageLabels";

interface CombatStageResultViewProps {
    output: CalculationOutput;
    participants: KeyedDictionary<ParticipantRole, ParticipantInput>;
}

export function CombatStageResultView({ output, participants }: CombatStageResultViewProps) {
    const [expanded, setExpanded] = useState(false);
    return (
        <Accordion expanded={expanded} onChange={() => setExpanded((prev) => !prev)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Outcomes by combat stage</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <CombatStageView output={output} participants={participants} stage={CombatStage.SpaceMines} />
                <CombatStageView output={output} participants={participants} stage={CombatStage.PDS} />
                <CombatStageView output={output} participants={participants} stage={CombatStage.StartOfBattle} />
                <CombatStageView output={output} participants={participants} stage={CombatStage.AntiFighterBarrage} />
                <CombatStageView output={output} participants={participants} stage={CombatStage.PreCombat} />
                <CombatStageView output={output} participants={participants} stage={CombatStage.Round1} />
            </AccordionDetails>
        </Accordion>
    );
}

interface CombatStageViewProps {
    output: CalculationOutput;
    participants: KeyedDictionary<ParticipantRole, ParticipantInput>;
    stage: CombatStage;
}

function CombatStageView(props: CombatStageViewProps) {
    const [expanded, setExpanded] = useState(false);
    const { output, participants, stage } = props;
    const stageOutput: CombatStageOutput | undefined = output.stages[stage];
    if (!stageOutput) return null;
    return (
        <Accordion expanded={expanded} onChange={() => setExpanded((prev) => !prev)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ width: "33%", flexShrink: 0 }}>{combatStageResources[stage].name}</Typography>
                <ParticipantHitsDisplay label="Attacker" participant={stageOutput.statistics.attacker} />
                <ParticipantHitsDisplay label="Defender" participant={stageOutput.statistics.defender} />
            </AccordionSummary>
            <AccordionDetails>
                <ResultPercentageLabels victorProbabilities={stageOutput.victorProbabilities} />
                <ResultPercentageBars victorProbabilities={stageOutput.victorProbabilities} participants={participants} />
            </AccordionDetails>
        </Accordion>
    );
}
interface ParticipantHitsDisplayProps {
    label: string;
    participant: CombatStageParticipantStatistics;
}

function ParticipantHitsDisplay({ label, participant }: ParticipantHitsDisplayProps) {
    let expected: number = round(participant.expectedHits, 1);
    let assigned: number = round(participant.assignedHits, 1);
    let expectedEqualsAssigned: boolean = expected === assigned;
    if (expectedEqualsAssigned) {
        let expectedPrecise: number = round(participant.expectedHits, 2);
        let assignedPrecise: number = round(participant.assignedHits, 2);
        expectedEqualsAssigned = expectedPrecise === assignedPrecise;
        if (!expectedEqualsAssigned) {
            expected = expectedPrecise;
            assigned = assignedPrecise;
        }
    }

    return (
        <Typography sx={{ width: "33%", color: "text.secondary" }}>
            {label} hits:{" "}
            {expectedEqualsAssigned ? (
                <span>{expected}</span>
            ) : (
                <>
                    <Tooltip title="Expected hits">
                        <span>{expected}</span>
                    </Tooltip>
                    {" ➔ "}
                    <Tooltip title="Assigned hits">
                        <span>{assigned}</span>
                    </Tooltip>
                </>
            )}
        </Typography>
    );
}
