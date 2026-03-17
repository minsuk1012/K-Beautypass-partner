/**
 * GTM dataLayer 이벤트 전송 유틸.
 * GTM 콘솔에서 이 이벤트들을 GA4/Meta Pixel/Clarity 태그로 연결한다.
 */

type EventParams = Record<string, string | number | boolean>;

function push(data: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/** 범용 이벤트 전송 */
export function trackEvent(event: string, params?: EventParams) {
  push({ event, ...params });
}

// ── B2B 전용 이벤트 ──

/** 문의 폼 제출 완료 */
export function trackInquirySubmit(hospitalName: string) {
  push({ event: 'inquiry_submit', hospital_name: hospitalName });
}

/** 바이탈커넥트 CTA 클릭 */
export function trackPartnerServiceClick() {
  push({ event: 'partner_service_click' });
}

/** 온라인 입점 신청 클릭 */
export function trackOnboardingClick() {
  push({ event: 'onboarding_click' });
}

/** 섹션 네비게이션 클릭 */
export function trackNavClick(section: string) {
  push({ event: 'nav_click', section });
}
