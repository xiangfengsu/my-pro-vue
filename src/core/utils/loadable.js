import Vue from "vue";
import Loading from '@/components/Loading'

export default component => {
  const AsyncComponent = () => ({
    component: component(),
    loading: Loading,
    delay: 200,
    timeout: 3000
  });
  return {
    render (h) {
      return h(AsyncComponent, {})
    }
}
};
