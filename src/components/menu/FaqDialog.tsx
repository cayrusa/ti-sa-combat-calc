import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { Paragraph } from "./Common";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function FaqDialog({ open, onClose }: Props) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle>
                <Typography variant="h4" color="text.primary">
                    FAQ
                </Typography>
            </DialogTitle>
            <OverlayScrollbarsComponent>
                <DialogContent>
                    <Typography variant="h5" color="text.primary" sx={{ marginTop: 3 }}>
                        Expected and assigned hits
                    </Typography>
                    <Paragraph>
                        For each combat stage, the number of expected hits for each participant is printed. Expected hits are an average of
                        all possible outcomes at the beginning of the stage, weighed by probability. Combat outcomes that end before the
                        stage in question are excluded from the average.
                    </Paragraph>
                    <Paragraph>
                        <b>Example:</b> 3 fighters would by default grant 0.6 expected hits in round 1. If the opponent has expected hits in
                        the AFB stage, the expected hits of the fighters will go down in round 1 (because some fighters are likely to be
                        destroyed). However, the expected hits will not drop below 0.2, since expected hits are only calculated for outcomes
                        where at least 1 fighter survives the AFB stage.
                    </Paragraph>
                    <Paragraph>
                        In some cases, the expected hits will differ from the number of actual assigned hits. This is usually due to
                        "oversaturation" of hits (i.e. all hits can't be assigned). In these cases, both expected and assigned hits will be
                        displayed.
                    </Paragraph>
                </DialogContent>
            </OverlayScrollbarsComponent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
