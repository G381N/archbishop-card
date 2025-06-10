export const generateVCard = () => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:MAR ILIOS YOHANAN KURIAKOSE
N:KURIAKOSE;ILIOS YOHANAN;MAR;;
TITLE:Metropolitan Archbishop & Apostolic Nuncio of Asia
ORG:ECCLESIA CATHOLICA ECUMENICA CHRISTI (ECCC) – INDIA
ADR;TYPE=WORK:;;Saint Francis of Assisi Cathedral;Calicut;Kerala;673603;India
ADR;TYPE=WORK:;;Cathedral & Abbey of St. Anthony, 5247 Sheridan Street;Detroit;MI;48213;USA
TEL;TYPE=CELL:+91 99955 09999
TEL;TYPE=WORK:+1 313-279-5561
EMAIL:nosf.asia@gmail.com
URL:${typeof window !== 'undefined' ? window.location.href : ''}
NOTE:B.A (Phil), ADSE (C S), LL.B (H), M.Sc. (Psy), D.Phil (C C)
END:VCARD`;
  
  return vcard;
};

export const downloadVCard = () => {
  const vcard = generateVCard();
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Archbishop_Kuriakose.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

export const shareToWhatsApp = (phoneNumber?: string) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const message = `Meet MAR ILIOS YOHANAN KURIAKOSE - Metropolitan Archbishop & Apostolic Nuncio of Asia. View his digital business card: ${url}`;
  
  if (phoneNumber) {
    // Format phone number (remove non-digits and ensure it starts with country code)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }
};

export const shareToSMS = (phoneNumber?: string) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const message = `Meet MAR ILIOS YOHANAN KURIAKOSE - Metropolitan Archbishop & Apostolic Nuncio of Asia. View his digital business card: ${url}`;
  
  if (phoneNumber) {
    window.open(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`, '_self');
  } else {
    window.open(`sms:?body=${encodeURIComponent(message)}`, '_self');
  }
};

export const formatPhoneNumber = (phone: string) => {
  // Simple phone number formatting
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  } else if (cleaned.startsWith('1') && cleaned.length === 11) {
    return `+1 ${cleaned.slice(1, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

export const isValidPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}; 