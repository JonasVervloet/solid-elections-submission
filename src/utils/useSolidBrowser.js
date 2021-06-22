import {useEffect, useState} from 'react';
import {useWebId} from '@solid/react';
import { getBaseURI } from './Solid';
import { readFolder } from './Solid';
import {fetchTriples} from './Solid';

const useSolidBrowser = () => {

    const webID = useWebId();
    const [folderURI, setFolderURI] = useState();
    const [folderData, setFolderData] = useState();
    const [fileSelected, setFileSelected] = useState(false);
    const [fileData, setFileData] = useState();
    const [uri, setUri] = useState();

    useEffect(() => {
        if (webID) {
            getBaseURI(webID).then(([success, URI]) => {
                if (success) {
                    console.log(URI);
                    setFolderURI(URI);
                } else {
                    console.log(URI);
                }
            });
        }
    }, [webID]);

    useEffect(() => {
        if (folderURI) {
            readFolder(folderURI).then((data) => {
                if (data) {
                    setFolderData(data);
                } else {
                    console.log(data);
                }
            });
        }
    }, [folderURI]);

    const getFolderNames = () => {
        if (fileSelected) {
            return [true, []]
        }
        if (folderData) {
            return [true, folderData.folders.map(
                folder => folder.name
            )];
        } else {
            return [false, null];
        }
    }

    const getFileNames = () => {
        if (fileSelected) {
            return [true, []];
        }
        if (folderData) {
            return [true, folderData.files.map(
                file => file.name
            )]
        } else {
            return [false, null];
        }
    }

    const openFolder = (name) => {
        if (folderData) {
            const folders = folderData.folders.filter(
                aFolder => aFolder.name == name
            );
            if (folders) {
                setFolderURI(folders[0].url);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const selectFolder = (name) => {
        const folders = folderData.folders.filter(
            aFolder => aFolder.name == name
        )
        if (folders) {
            setUri(folders[0].url);
        }
    }
    
    const openFile = (name) => {
        if (fileSelected) {
            return false;
        }
        if (folderData) {
            const files = folderData.files.filter(
                aFile => aFile.name == name
            );
            if (files) {
                fetchTriples(files[0].url).then(([success, triples]) => {
                    if (success) {
                        setFileData(triples);
                        setFileSelected(true);
                        return true;
                    } else {
                        return false;
                    }
                })
                return true;
            } else {
                return false
            }
        } else {
            return false;
        }
    }

    const selectFile = (name) => {
        const files = folderData.files.filter(
            aFile => aFile.name == name
        )
        if (files) {
            setUri(files[0].url)
        }
    }

    const getFileData = () => {
        if (fileSelected) {
            if (fileData) {
                return [true, fileData]
            }
            return [false, null]
        }

        return [true, []]
    }

    const getGroupedFileData = () => {
        if (! fileSelected) {
            return [true, []];
        }
        if (fileData) {
            const groupedDataObject =  fileData.reduce((grouped, triple) => {
                (grouped[triple.subject] = grouped[triple.subject] || [])
                .push(triple);
                return grouped;
            }, {});

            const groupedData = []

            Object.keys(groupedDataObject).map(
                key => {
                    const split = key.split('#');
                    if (! split.length == 2) {
                        throw 'Invalid key!'
                    }
                    groupedData.push(
                        {
                            url: key,
                            name: split[1],
                            triples: groupedDataObject[key]
                        }
                    )
                }
            )

            return [true, groupedData]
        } else {
            return [false, null];
        }
    }

    const selectSubject = (uri) => {
        setUri(uri);
    }

    const goBack = () => {
        if (fileSelected) {
            setFileSelected(false);
        } else {
            setFolderURI(folderData.parent);
        }
    }

    return {
        goBack,
        uri,
        foldersManager: {
            openFolder,
            selectFolder,
            getFolderNames
        },
        filesManager: {
            getFileNames,
            openFile,
            selectFile
        },
        fileDataManager: {
            getGroupedFileData,
            selectSubject
        }
    };
}

export default useSolidBrowser;