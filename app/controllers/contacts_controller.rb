class ContactsController < ApplicationController
  # GET /contacts
  # GET /contacts.xml
  def index
    #@contacts = Contact.paginate :page => params[:page]
    
    @contacts = Contact.all
    render :json => { :success => true, :message => "List All Contacts", :contact => @contacts }
  end

  # GET /contacts/1
  # GET /contacts/1.xml
  def show
    @contact = Contact.find(params[:id])
    render :json => { :success => true, :message => "Show Contacts", :contact => @contact }
    # respond_to do |format|
    #   format.html # show.html.erb
    #   format.xml  { render :xml => @contact }
    # end
  end

  # GET /contacts/new
  # GET /contacts/new.xml
  def new
    @contact = Contact.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @contact }
    end
  end

  # GET /contacts/1/edit
  def edit
    @contact = Contact.find(params[:id])
  end

  # POST /contacts
  # POST /contacts.xml
  def create
     
    @contact = Contact.new(params[:contact])
    
    if @contact.save
      render :json => { :success => true, :message => "Created new contact #{@contact.id}", :contact => @contact }
    else
      render :json => { :success => false, :message => "Failed to create contact"}
    end
    
    # @contact = Contact.new(params[:contact])
    # 
    # respond_to do |format|
    #   if @contact.save
    #     format.html { redirect_to(@contact, :notice => 'Contact was successfully created.') }
    #     format.xml  { render :xml => @contact, :status => :created, :location => @contact }
    #   else
    #     format.html { render :action => "new" }
    #     format.xml  { render :xml => @contact.errors, :status => :unprocessable_entity }
    #   end
    # end
  end

  # PUT /contacts/1
  # PUT /contacts/1.xml
  def update
    @contact = Contact.find(params[:id])

    # respond_to do |format|
      if @contact.update_attributes(params[:contact])
        # format.html { redirect_to(@contact, :notice => 'Contact was successfully updated.') }
        # format.xml  { head :ok }
        render :json => { :success => true, :message => "Created new client #{@contact.id}", :contact => @contact }
      else
        render :json => { :success => false, :message => "Failed to create contact"}
        # format.html { render :action => "edit" }
        # format.xml  { render :xml => @contact.errors, :status => :unprocessable_entity }
      end
    # end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.xml
  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    render :json => { :success => true, :message => "Delete product #{@client.id}", :client => @client }
    # respond_to do |format|
    #   format.html { redirect_to(contacts_url) }
    #   format.xml  { head :ok }
    # end
  end
end
