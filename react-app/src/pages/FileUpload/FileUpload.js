import { useState } from "react";
import axios from 'axios';
import { FileUploadStyles } from "./FileUpload.styles";
import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';
import Box from '../../components/Box';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import BackupIcon from '@mui/icons-material/Backup';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

const FileUpload = () => {
    const [csvFile, setCsvFile] = useState();
    const [account, setAccount] = useState('');
    const [alert, setAlert] = useState({ open: false, type: '', msg: '' });

    const onFileChange = (evt) => {
        if (!evt.target.files?.length) {
            return;
        }

        const formData = new FormData();
        formData.append('file', evt.target.files[0]);
        setCsvFile(formData);
    };

    const uploadFile = () => {
        csvFile.append('account', account);
        axios.post('/api/import', csvFile).then(resp => {
            if (resp.data === 'Success') {
                setAlert({ open: true, type: 'success', msg: 'Data Uploaded Successfully'});
            }
            else {
                setAlert({ open: true, type: 'error', msg: 'Error Uploading Data'});
            }
            setAccount('');
            setCsvFile(null);
        });
    };

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <FileUploadStyles>
            <h2 className="page-title">Import Data</h2>
            <Box>
                <Stack spacing={3} alignItems="flex-start">
                    <SelectInput
                        label="Account"
                        value={account}
                        width="200px"
                        onChange={evt => setAccount(evt.target.value)
                    }>
                        <MenuItem value="checking">Checking</MenuItem>
                        <MenuItem value="savings">Savings</MenuItem>
                        <MenuItem value="chase-bonvoy">Chase Bonvoy</MenuItem>
                        <MenuItem value="chase-amazon">Chase Amazon</MenuItem>
                    </SelectInput>
                    <input
                        id="component-outlined"
                        type="file"
                        accept="cvs"
                        onChange={evt => onFileChange(evt)}
                    />
                    <Button onClick={uploadFile} disabled={account === '' || !csvFile}>
                        <BackupIcon /> Import
                    </Button>
                </Stack>
            </Box>
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                TransitionComponent={props => <Slide {...props} direction="left" />}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={alert.type}>{alert.msg}</Alert>
            </Snackbar>
        </FileUploadStyles>
    );
}

export default FileUpload;