export interface NbConfig {
    deviceId: string;
    gatewayId: string;
    serviceType: string;
    serviceId: string; 
    isParsing: string;
    parseField: string;
    parseJarPath: string;
    parseJarClass: string;
    parseJarMethod: string;
    isBaseDecode: string;
    storageFields: string;
    isCallback: string;
    appId: string;
    method: string;
    callbackUrl: string;
    maxRetransmit: string;
    expireTime: string;
    callbackFieldsKey: string;
    callbackFieldsValues: string;
}
