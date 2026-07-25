import React, { useEffect, useState } from 'react';
import {
  Document, Page, View, Text, Svg, Path, Rect, Circle,
  Line, Image, Font, StyleSheet,
} from '@react-pdf/renderer';
import { generateQRCodeDataURL, buildPrescriptionQRData } from '../../utils/qrcode';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Caveat',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SII.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjRV6SII.ttf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Poppins',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrFJA.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6V1s.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7V1s.ttf', fontWeight: 700 },
  ],
});

const COLORS = {
  darkGreen: '#1F5E3B',
  midGreen: '#2A7A4A',
  lightGreen: '#7FBF6A',
  paleGreen: '#E8F5E3',
  gold: '#C9A227',
  goldLight: '#F5ECD0',
  white: '#FFFFFF',
  black: '#1A1A1A',
  gray900: '#1F2937',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  red500: '#EF4444',
  red50: '#FEF2F2',
};

interface Medicine {
  medicine_name: string;
  potency?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  before_after?: string;
  instructions?: string;
}

interface PreviousVisit {
  date: string;
  diagnosis: string;
  medicines: string;
  follow_up_date: string;
}

interface PrescriptionData {
  prescription_number: string;
  created_at: string;
  barcode: string;
  symptoms: string;
  diagnosis: string;
  investigations: string;
  advice: string;
  additional_notes: string;
  follow_up_date: string;
  doctor_notes: string;
  medicines: Medicine[] | string;
  patient_name: string;
  patient_code: string;
  gender: string;
  age: number;
  mobile: string;
  blood_group: string;
  weight?: string;
  height?: string;
  doctor_name: string;
  qualification: string;
  registration_number: string;
  specialization: string;
  branch_name: string;
  branch_address: string;
  branch_contact: string;
  branch_timing: string;
  previous_visit?: PreviousVisit;
  visit_number?: number;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: COLORS.gray900,
    backgroundColor: COLORS.white,
    padding: 0,
  },
  headerContainer: {
    position: 'relative',
    height: 110,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  logoArea: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  hospitalSub: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 1,
    letterSpacing: 0.3,
  },
  hospitalTagline: {
    fontFamily: 'Caveat',
    fontSize: 9,
    color: COLORS.gold,
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  headerRightText: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  rxSymbol: {
    fontFamily: 'Poppins',
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.darkGreen,
    marginTop: 4,
  },
  goldBar: {
    height: 3,
    backgroundColor: COLORS.gold,
  },
  bodyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 0,
  },
  sidebar: {
    width: '28%',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray200,
  },
  mainContent: {
    width: '72%',
    paddingLeft: 12,
  },
  sidebarSection: {
    marginBottom: 8,
  },
  sidebarLabel: {
    fontFamily: 'Inter',
    fontSize: 7,
    fontWeight: '600',
    color: COLORS.darkGreen,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sidebarValue: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: COLORS.gray700,
    lineHeight: 1.4,
  },
  sidebarDoctorName: {
    fontFamily: 'Poppins',
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.darkGreen,
    marginBottom: 1,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.darkGreen,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGreen,
  },
  patientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.paleGreen,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    gap: 4,
  },
  patientItem: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  patientLabel: {
    fontFamily: 'Inter',
    fontSize: 7,
    color: COLORS.gray500,
    marginRight: 4,
  },
  patientValue: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  clinicalSection: {
    marginBottom: 6,
  },
  clinicalLabel: {
    fontFamily: 'Poppins',
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.midGreen,
    marginBottom: 2,
  },
  clinicalText: {
    fontFamily: 'Inter',
    fontSize: 8.5,
    color: COLORS.gray700,
    lineHeight: 1.5,
  },
  medicineRow: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingBottom: 5,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.gray200,
  },
  medicineNumber: {
    fontFamily: 'Poppins',
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.gold,
    width: 18,
  },
  medicineDetails: {
    flex: 1,
  },
  medicineName: {
    fontFamily: 'Caveat',
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 1,
  },
  medicineInfo: {
    fontFamily: 'Caveat',
    fontSize: 10,
    color: COLORS.gray600,
    lineHeight: 1.3,
  },
  medicineInstruction: {
    fontFamily: 'Inter',
    fontSize: 7,
    color: COLORS.darkGreen,
    backgroundColor: COLORS.paleGreen,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  previousVisitBox: {
    backgroundColor: COLORS.goldLight,
    borderRadius: 4,
    padding: 8,
    marginTop: 6,
    borderWidth: 0.5,
    borderColor: COLORS.gold,
  },
  previousVisitTitle: {
    fontFamily: 'Poppins',
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.gold,
    marginBottom: 3,
  },
  previousVisitText: {
    fontFamily: 'Inter',
    fontSize: 7.5,
    color: COLORS.gray600,
    lineHeight: 1.4,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  signatureArea: {
    alignItems: 'center',
  },
  signatureLine: {
    width: 130,
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.gray400,
    marginBottom: 3,
  },
  signatureLabel: {
    fontFamily: 'Inter',
    fontSize: 7,
    color: COLORS.gray500,
  },
  footerBar: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: 6.5,
    color: 'rgba(255,255,255,0.8)',
  },
  footerDisclaimer: {
    fontFamily: 'Inter',
    fontSize: 6,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    backgroundColor: COLORS.darkGreen,
    paddingBottom: 4,
    paddingHorizontal: 20,
  },
});

function HeaderSVG() {
  return (
    <Svg style={styles.headerBg} viewBox="0 0 595.28 110" preserveAspectRatio="none">
      <Path
        d="M0,0 L595.28,0 L595.28,75 Q450,105 297.64,90 Q145,75 0,95 Z"
        fill={COLORS.darkGreen}
      />
      <Path
        d="M0,78 Q150,58 297.64,72 Q445,86 595.28,68 L595.28,75 Q450,105 297.64,90 Q145,75 0,95 Z"
        fill={COLORS.midGreen}
        opacity={0.5}
      />
      <Path
        d="M0,88 Q150,68 297.64,82 Q445,96 595.28,78 L595.28,110 L0,110 Z"
        fill={COLORS.lightGreen}
        opacity={0.15}
      />
    </Svg>
  );
}

function WatermarkSVG() {
  return (
    <Svg
      style={{ position: 'absolute', top: 200, left: 180, opacity: 0.03 }}
      width={200}
      height={200}
      viewBox="0 0 200 200"
    >
      {/* Homeopathy mortar & pestle symbol */}
      <Circle cx={100} cy={80} r={50} fill="none" stroke={COLORS.darkGreen} strokeWidth={3} />
      <Line x1={70} y1={130} x2={130} y2={130} stroke={COLORS.darkGreen} strokeWidth={3} />
      <Line x1={100} y1={130} x2={100} y2={170} stroke={COLORS.darkGreen} strokeWidth={3} />
      <Line x1={75} y1={170} x2={125} y2={170} stroke={COLORS.darkGreen} strokeWidth={3} />
      {/* Plus cross */}
      <Line x1={100} y1={55} x2={100} y2={105} stroke={COLORS.darkGreen} strokeWidth={2} />
      <Line x1={75} y1={80} x2={125} y2={80} stroke={COLORS.darkGreen} strokeWidth={2} />
    </Svg>
  );
}

function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarLabel}>{label}</Text>
      {children}
    </View>
  );
}

function PrescriptionDocument({ data, qrDataUrl }: { data: PrescriptionData; qrDataUrl: string }) {
  let medicines: Medicine[] = [];
  try {
    medicines = typeof data.medicines === 'string' ? JSON.parse(data.medicines) : data.medicines || [];
  } catch {
    medicines = [];
  }

  const createdDate = data.created_at?.split('T')[0] || new Date().toISOString().split('T')[0];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <WatermarkSVG />

        {/* Header */}
        <View style={styles.headerContainer}>
          <HeaderSVG />
          <View style={styles.headerContent}>
            <View style={styles.logoArea}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: '700', color: COLORS.darkGreen }}>G</Text>
            </View>
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalName}>Gurudev Cure</Text>
              <Text style={styles.hospitalSub}>Homeopathic Hospital</Text>
              <Text style={styles.hospitalTagline}>Natural Healing with Personalized Care</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerRightText}>Date: {createdDate}</Text>
              <Text style={{ ...styles.headerRightText, fontWeight: '600', color: COLORS.gold }}>
                {data.prescription_number}
              </Text>
              {data.branch_name ? (
                <Text style={styles.headerRightText}>{data.branch_name}</Text>
              ) : null}
              {data.branch_contact ? (
                <Text style={styles.headerRightText}>Ph: {data.branch_contact}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* Gold accent bar */}
        <View style={styles.goldBar} />

        {/* Body */}
        <View style={styles.bodyContainer}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <View style={{ alignItems: 'center', marginBottom: 8, paddingBottom: 8, borderBottomWidth: 0.5, borderBottomColor: COLORS.gray200 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.paleGreen, alignItems: 'center', justifyContent: 'center', marginBottom: 4, borderWidth: 1, borderColor: COLORS.lightGreen }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '700', color: COLORS.darkGreen }}>D</Text>
              </View>
              <Text style={styles.sidebarDoctorName}>Dr. {data.doctor_name}</Text>
              <Text style={{ ...styles.sidebarValue, fontSize: 7.5, color: COLORS.darkGreen }}>
                {data.qualification}
              </Text>
              {data.specialization ? (
                <Text style={{ ...styles.sidebarValue, fontSize: 7, marginTop: 1 }}>{data.specialization}</Text>
              ) : null}
            </View>

            {data.registration_number ? (
              <SidebarSection label="Registration">
                <Text style={styles.sidebarValue}>{data.registration_number}</Text>
              </SidebarSection>
            ) : null}

            <SidebarSection label="Consultation Hours">
              <Text style={styles.sidebarValue}>{data.branch_timing || 'Mon-Sat: 9AM-8PM'}</Text>
            </SidebarSection>

            <SidebarSection label="Hospital Contact">
              <Text style={styles.sidebarValue}>{data.branch_contact || '+91 98765 43210'}</Text>
              <Text style={{ ...styles.sidebarValue, fontSize: 7, color: COLORS.red500, marginTop: 1 }}>
                Emergency: 108
              </Text>
            </SidebarSection>

            <SidebarSection label="Address">
              <Text style={{ ...styles.sidebarValue, fontSize: 7, lineHeight: 1.3 }}>
                {data.branch_address || '123 Health Street, Medical Colony, City - 500001'}
              </Text>
            </SidebarSection>

            {/* QR Code */}
            {qrDataUrl && qrDataUrl.length > 10 && (
              <View style={{ alignItems: 'center', marginTop: 6, paddingTop: 6, borderTopWidth: 0.5, borderTopColor: COLORS.gray200 }}>
                <Image src={qrDataUrl} style={{ width: 52, height: 52 }} />
                <Text style={{ fontFamily: 'Inter', fontSize: 5.5, color: COLORS.gray400, marginTop: 2 }}>
                  Scan to verify
                </Text>
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Rx Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <View>
                <Text style={styles.rxSymbol}>℞</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {data.visit_number ? (
                  <Text style={{ fontFamily: 'Inter', fontSize: 7, color: COLORS.gray500 }}>
                    Visit #{data.visit_number}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Patient Info */}
            <View style={styles.patientGrid}>
              <View style={styles.patientItem}>
                <Text style={styles.patientLabel}>Name:</Text>
                <Text style={styles.patientValue}>{data.patient_name}</Text>
              </View>
              <View style={styles.patientItem}>
                <Text style={styles.patientLabel}>ID:</Text>
                <Text style={styles.patientValue}>{data.patient_code}</Text>
              </View>
              <View style={styles.patientItem}>
                <Text style={styles.patientLabel}>Age/Sex:</Text>
                <Text style={styles.patientValue}>{data.age}y / {data.gender}</Text>
              </View>
              <View style={styles.patientItem}>
                <Text style={styles.patientLabel}>Mobile:</Text>
                <Text style={styles.patientValue}>{data.mobile || '—'}</Text>
              </View>
              {data.blood_group ? (
                <View style={styles.patientItem}>
                  <Text style={styles.patientLabel}>Blood:</Text>
                  <Text style={styles.patientValue}>{data.blood_group}</Text>
                </View>
              ) : null}
              {data.weight ? (
                <View style={styles.patientItem}>
                  <Text style={styles.patientLabel}>Weight:</Text>
                  <Text style={styles.patientValue}>{data.weight} kg</Text>
                </View>
              ) : null}
            </View>

            {/* Clinical Sections */}
            {data.symptoms ? (
              <View style={styles.clinicalSection}>
                <Text style={styles.clinicalLabel}>Chief Complaints</Text>
                <Text style={styles.clinicalText}>{data.symptoms}</Text>
              </View>
            ) : null}

            {data.diagnosis ? (
              <View style={styles.clinicalSection}>
                <Text style={styles.clinicalLabel}>Diagnosis</Text>
                <Text style={styles.clinicalText}>{data.diagnosis}</Text>
              </View>
            ) : null}

            {data.investigations ? (
              <View style={styles.clinicalSection}>
                <Text style={styles.clinicalLabel}>Investigations</Text>
                <Text style={styles.clinicalText}>{data.investigations}</Text>
              </View>
            ) : null}

            {data.advice ? (
              <View style={styles.clinicalSection}>
                <Text style={styles.clinicalLabel}>Advice</Text>
                <Text style={styles.clinicalText}>{data.advice}</Text>
              </View>
            ) : null}

            {/* Medicines */}
            <View style={{ marginTop: 4 }}>
              <Text style={styles.sectionTitle}>Medicines</Text>
              {medicines.length > 0 ? (
                medicines.map((m, i) => (
                  <View key={i} style={styles.medicineRow}>
                    <Text style={styles.medicineNumber}>{i + 1}.</Text>
                    <View style={styles.medicineDetails}>
                      <Text style={styles.medicineName}>
                        {m.medicine_name}
                        {m.potency ? `  (${m.potency})` : ''}
                      </Text>
                      <Text style={styles.medicineInfo}>
                        {m.dosage ? `${m.dosage}  ` : ''}
                        {m.frequency ? `${m.frequency}` : ''}
                        {m.duration ? `  ×  ${m.duration}` : ''}
                        {m.before_after ? `  ·  ${m.before_after === 'before' ? 'Before food' : 'After food'}` : ''}
                      </Text>
                      {m.instructions ? (
                        <Text style={styles.medicineInstruction}>{m.instructions}</Text>
                      ) : null}
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ fontFamily: 'Caveat', fontSize: 11, color: COLORS.gray400, fontStyle: 'italic' }}>
                  No medicines prescribed
                </Text>
              )}
            </View>

            {/* Additional Notes */}
            {data.additional_notes ? (
              <View style={{ marginTop: 6 }}>
                <Text style={styles.clinicalLabel}>Notes</Text>
                <Text style={styles.clinicalText}>{data.additional_notes}</Text>
              </View>
            ) : null}

            {/* Follow-up */}
            {data.follow_up_date ? (
              <View style={{
                marginTop: 6,
                backgroundColor: COLORS.paleGreen,
                borderRadius: 4,
                padding: 6,
                borderWidth: 0.5,
                borderColor: COLORS.lightGreen,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 8, fontWeight: '600', color: COLORS.darkGreen, marginRight: 6 }}>
                  Follow-up:
                </Text>
                <Text style={{ fontFamily: 'Caveat', fontSize: 12, fontWeight: '700', color: COLORS.darkGreen }}>
                  {data.follow_up_date}
                </Text>
              </View>
            ) : null}

            {/* Previous Visit Summary */}
            {data.previous_visit ? (
              <View style={styles.previousVisitBox}>
                <Text style={styles.previousVisitTitle}>Previous Visit Summary</Text>
                <Text style={styles.previousVisitText}>
                  Date: {data.previous_visit.date}
                  {data.previous_visit.diagnosis ? `  |  Diagnosis: ${data.previous_visit.diagnosis}` : ''}
                </Text>
                {data.previous_visit.medicines ? (
                  <Text style={{ ...styles.previousVisitText, marginTop: 2 }}>
                    Medicines: {data.previous_visit.medicines}
                  </Text>
                ) : null}
                {data.previous_visit.follow_up_date ? (
                  <Text style={{ ...styles.previousVisitText, marginTop: 2, color: COLORS.darkGreen, fontWeight: '600' }}>
                    Follow-up was: {data.previous_visit.follow_up_date}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          {/* Signature area */}
          <View style={styles.signatureRow}>
            <View>
              {data.barcode ? (
                <View style={{ alignItems: 'center' }}>
                  {/* Barcode rendered as text since SVG barcode in PDF is complex */}
                  <Text style={{ fontFamily: 'Inter', fontSize: 6, color: COLORS.gray400, letterSpacing: 1 }}>
                    {data.barcode}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <View style={styles.signatureArea}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureLabel}>Doctor's Signature</Text>
              </View>
              <View style={styles.signatureArea}>
                <View style={{ ...styles.signatureLine, width: 80 }} />
                <Text style={styles.signatureLabel}>Hospital Seal</Text>
              </View>
            </View>
          </View>

          {/* Footer bar */}
          <View style={styles.footerBar}>
            <Text style={styles.footerText}>
              123 Health Street, Medical Colony, City - 500001
            </Text>
            <Text style={styles.footerText}>
              Ph: {data.branch_contact || '+91 98765 43210'}  |  www.gurudevcure.com
            </Text>
            <Text style={styles.footerText}>
              info@gurudevcure.com
            </Text>
          </View>
          <View style={styles.footerDisclaimer}>
            <Text style={styles.footerDisclaimer}>
              Thank you for choosing Gurudev Cure Homeopathic Hospital. Medicines should be taken only as prescribed by the doctor.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default function PrescriptionPDF({
  data,
  qrDataUrl: qrProp,
}: {
  data: PrescriptionData;
  qrDataUrl?: string;
}) {
  const [qrUrl, setQrUrl] = useState(qrProp || '');

  useEffect(() => {
    if (qrProp) { setQrUrl(qrProp); return; }
    const qrText = buildPrescriptionQRData(data);
    generateQRCodeDataURL(qrText).then(setQrUrl);
  }, [data, qrProp]);

  return (
    <PrescriptionDocument data={data} qrDataUrl={qrUrl} />
  );
}

function PrescriptionPDFStatic({
  data,
  qrDataUrl,
}: {
  data: PrescriptionData;
  qrDataUrl: string;
}) {
  return <PrescriptionDocument data={data} qrDataUrl={qrDataUrl} />;
}

export { PrescriptionDocument, PrescriptionPDFStatic };
export type { PrescriptionData };
