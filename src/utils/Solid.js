import { fetchDocument } from "tripledoc"
import {space} from 'rdf-namespaces'
import {graph, Fetcher} from 'rdflib'
import auth from 'solid-auth-client'
import FileClient from 'solid-file-client'

const fileClient = new FileClient(auth);

export const getBaseURI = async (webID) => {
    const profileDoc = await fetchDocument(webID);
    const profile = profileDoc.getSubject(webID);
    
    const storageFolder = await fileClient.readFolder(
        profile.getRef(space.storage)
    )

    return [true, storageFolder.url];
}

const getPublicFolderURI = async (webID) => {
    const profileDoc = await fetchDocument(webID);
    const profile = profileDoc.getSubject(webID);

    const storageFolder = await fileClient.readFolder(
        profile.getRef(space.storage)
    )

    const publicFolders = storageFolder.folders.filter(
        folder => folder.name == 'public'
    )

    if (publicFolders.length > 0) {
        return publicFolders[0].url
    }

    const result = await fileClient.createFolder(
        storageFolder.url + "public/"
    )

    // TODO: handle fail of folder creation!
    console.log(result);

    return result.url;
}

export const getAppFolderURI = async (webID) => {

    const publicFolder = await fileClient.readFolder(
        await getPublicFolderURI(webID)
    );

    const appFolders = publicFolder.folders.filter(
        folder => folder.name == 'solidelections'
    )

    if (appFolders.length > 0) {
        return appFolders[0].url;
    }

    const result = await fileClient.createFolder(
        publicFolder.url + "solidelections/"
    );

    // TODO: handle fail of folder creation!
    console.log(result);

    return result.url;
}

export const getFolderFiles = async (uri) => {
    const folder = await fileClient.readFolder(uri);

    if (folder) {
        return folder.files;
    }

    return null;
}

export const readFolder = async (uri) => {
    return await fileClient.readFolder(uri);
}

export const fetchTriples = async (uri) => {
    try {
        const store = graph();
        const fetcher = new Fetcher(store, {});
        await fetcher.load(uri);

        const triples = store.statementsMatching(undefined, undefined, undefined);

        return [
            true, triples.map(
                triple => tripleToJson(triple)
            ).filter(
                triple => selectDocumentTriples(triple, uri)
            )
        ]
    } catch (e) {
        console.log(e);

        return [false, e]
    }
}

const tripleToJson = triple => {
    return {
      subject: triple.subject.value,
      predicate: triple.predicate.value,
      object: triple.object.value
    }
}

const selectDocumentTriples = (triple, uri) => {
    const split = triple.subject.split('#');
    if (split.length == 2 
        && split[0] == uri) {
            return true;
        } else {
            return false;
        }
}
