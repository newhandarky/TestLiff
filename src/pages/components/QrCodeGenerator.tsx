import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";

const QrCodeGenerator: React.FC = () => {
    const [url, setUrl] = useState<string>("https://example.com");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>QR Code Generator</h1>
            <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="Enter URL"
                style={{
                    padding: "10px",
                    width: "240px",
                    fontSize: "16px",
                }}
            />
            <div style={{ marginTop: "20px" }}>
                <QRCode
                    value={url}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    qrStyle="squares"
                    logoImage="/original.jpg" // 可選：嵌入 Logo
                    logoWidth={40}
                />
            </div>
        </div>
    );
};

export default QrCodeGenerator;
