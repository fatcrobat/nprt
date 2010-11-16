<div id="pager"  class="tablesortpager">
	<form>
		<div class="control">
			<div class="pagesize-wrapper">
				<label for="pagesize"><?php print t('Results per page'); ?></label>
				<select name="pagesize" class="pagesize form-select" id="pageSize">
					<option selected="selected" value="25">25</option>
					<option value="30">30</option>
					<option value="40">40</option>
					<option  value="50">50</option>
				</select>
			</div>
			<div class="pager-wrapper">
				<a href="javascript:void(0);" class="btn green on" id="pageFirst"><span>&lsaquo;&lsaquo;</span></a>
				<a href="javascript:void(0);" class="btn green on" id="pagePrev"><span>&lsaquo;</span></a>
				<a href="javascript:void(0);" class="btn green" id="pageSelect1"><span>1</span></a>
				<a href="javascript:void(0);" class="btn green" id="pageSelect2"><span>2</span></a>
				<a href="javascript:void(0);" class="btn green" id="pageSelect3"><span>3</span></a>
				<a href="javascript:void(0);" class="btn green on" id="pageNext"><span>&rsaquo;</span></a>
				<a href="javascript:void(0);" class="btn green on" id="pageLast"><span>&rsaquo;&rsaquo;</span></a>
			</div>
		</div>
		<div class="control-left">
			<label><?php print t('Page')?></label>
			<input id="pageDisplay" class="pagedisplay form-text" type="text" /><?php print t('of'); ?> 
			<label id="pageCount" class="pagecount"></label>
			<input 	name="filter" id="filter-box" value="<?php print t('Search...'); ?>" maxlength="18" size="18" type="text" 
					onfocus="if (this.value == '<?php print ('Search...')?>') {this.value = '';}" 
					onblur="if (this.value == '') {this.value = '<?php print ('Search...')?>';}" class="form-text">
			<a href="javascript:void(0);" id="filter-clear-button" class="btn green">
				<span>
					<img src="<?php print base_path().drupal_get_path('module', 'nprt').'/px/clear.png';?> " />
				</span>
			</a>
		</div>
	</form>
</div>
