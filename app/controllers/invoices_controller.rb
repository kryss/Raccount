class InvoicesController < ApplicationController
  # GET /invoices
  # GET /invoices.xml
  def index

		if params[:invoice_id].nil?
	    @invoices = Invoice.all
		else
			@invoices = Invoice.where(:id => params[:invoice_id])
		end
    render :json => { :success => true, :message => "List All Invoices", :invoice => @invoices }
    # @invoices = Invoice.all
    # 
    # respond_to do |format|
    #   format.html # index.html.erb
    #   format.xml  { render :xml => @invoices }
    # end
  end

  # GET /invoices/1
  # GET /invoices/1.xml
  def show
    @invoice = Invoice.find(params[:id])
    render :json => { :success => true, :message => "Show invoice", :invoice => @invoice }
    # respond_to do |format|
    #   format.html # show.html.erb
    #   format.xml  { render :xml => @invoice }
    # end
  end

  # GET /invoices/new
  # GET /invoices/new.xml
  def new
    @invoice = Invoice.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @invoice }
    end
  end

  # GET /invoices/1/edit
  def edit
    @invoice = Invoice.find(params[:id])
  end

  # POST /invoices
  # POST /invoices.xml
  def create
    @invoice = Invoice.new(params[:invoice])
    
    if @invoice.save
      render :json => { :success => true, :message => "Created new invoice #{@invoice.id}", :invoice => @invoice }
    else
      render :json => { :success => false, :message => "Failed to create invoice"}
    end
    
    # @invoice = Invoice.new(params[:invoice])
    # 
    # respond_to do |format|
    #   if @invoice.save
    #     format.html { redirect_to(@invoice, :notice => 'Invoice was successfully created.') }
    #     format.xml  { render :xml => @invoice, :status => :created, :location => @invoice }
    #   else
    #     format.html { render :action => "new" }
    #     format.xml  { render :xml => @invoice.errors, :status => :unprocessable_entity }
    #   end
    # end
  end

  # PUT /invoices/1
  # PUT /invoices/1.xml
  def update
    @invoice = Invoice.find(params[:id])

    # respond_to do |format|
      if @invoice.update_attributes(params[:invoice])
        
        # format.html { redirect_to(@invoice, :notice => 'Invoice was successfully updated.') }
        # format.xml  { head :ok }
        render :json => { :success => true, :message => "Created new invoice #{@invoice.id}", :invoice => @invoice }
      else
        render :json => { :success => false, :message => "Failed to create invoice"}
        # format.html { render :action => "edit" }
        # format.xml  { render :xml => @invoice.errors, :status => :unprocessable_entity }
      end
    # end
  end

  # DELETE /invoices/1
  # DELETE /invoices/1.xml
  def destroy
    @invoice = Invoice.find(params[:id])
    @invoice.destroy
    render :json => { :success => true, :message => "Delete product #{@invoice.id}", :invoice => @invoice }

    # respond_to do |format|
    #   format.html { redirect_to(invoices_url) }
    #   format.xml  { head :ok }
    # end
  end
end
