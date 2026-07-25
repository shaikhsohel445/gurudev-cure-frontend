import QRCode from 'qrcode';

export async function generateQRCodeDataURL(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 80,
      margin: 1,
      color: {
        dark: '#1F5E3B',
        light: '#FFFFFF',
      },
    });
  } catch {
    return '';
  }
}

export function buildPrescriptionQRData(presc: any): string {
  const data = {
    prescription: presc.prescription_number,
    patient: presc.patient_code || presc.patient_id,
    hospital: 'Gurudev Cure Homeopathic Hospital',
    doctor: presc.doctor_name,
    date: presc.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
  };
  return JSON.stringify(data);
}
