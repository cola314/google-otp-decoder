# google-otp-decoder
extract secret from google otp backup qr code

## How to use
1. make backup qr in google otp
2. extract url from qrcode using camera or qr-code scanner
3. run it with the url to get secrets

```
npm i
npm start otpauth-migration://offline?data=...
```

## How it works
1. get data value from 'otpauth-migration://offline?data=[value]'
2. url decode
3. base64 decode
4. protobuf decode (google.proto)
5. base32 encode for show each secret 