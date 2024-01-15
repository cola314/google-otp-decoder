import protobuf from 'protobufjs';
import fs from 'fs';
import base32Encode from 'base32-encode'

main(process.argv);

function main(args) {
    let otpLink = args[2];
    const accounts = getAccounts(otpLink);
    
    console.log(accounts);
}

function getAccounts(otpLink) {
    let data = parseData(otpLink);
    data = decodeURIComponent(data);
    data = Buffer.from(data, 'base64');
    data = decodeProto(data);

    const accounts = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const secret = encodeBase32(item.secret);

        accounts.push({
            name: item.name,
            issuer: item.issuer,
            secret: secret,
        });
    }

    return accounts;
}

function parseData(link) {
    return link.split("data=")[1];
}

function decodeProto(data) {
    const protoDef = fs.readFileSync('google.proto', 'utf-8');
    const root = protobuf.parse(protoDef).root;
    const MigrationPayloadType = root.lookupType('MigrationPayload');

    return MigrationPayloadType.decode(data).otpParameters;
}

function encodeBase32(str) {
    return base32Encode(str, 'RFC4648').replaceAll('=', '');
}
