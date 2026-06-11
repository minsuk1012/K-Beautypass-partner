import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '병원 홈페이지, 다국어까지 0원 제작 | KBEAUTYPASS 파트너',
  description:
    'KBP 입점 병원에게는 한국어+영·중·일 홈페이지 제작이 무료입니다. 예약이 성사될 때만 수수료를 받는 구조라 가능합니다. 외국인 환자는 구글에서 병원을 찾습니다.',
};

export default function VariantHLayout({ children }: { children: React.ReactNode }) {
  return children;
}
