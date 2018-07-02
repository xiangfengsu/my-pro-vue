
<script>
export default {
  name: "table-customcolumn",
  props: {
    renderContent: Function,
    scope: Object,
    prop: String
  },
  render(h) {
    const prop = this.prop;
    const scope = this.scope;
    return this.renderContent ? (
      this.renderContent.call(this._renderProxy, h, { row: scope.row,text:scope.row[prop] })
    ) : (
      <span>{scope.row[prop]}</span>
    );
  }
};
</script>

