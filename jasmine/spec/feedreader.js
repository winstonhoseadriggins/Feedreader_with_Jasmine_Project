/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        
        it('have URLs', function() {
            var i, len;
            for (i = 0, len = allFeeds.length; i < len; i++) {
                var url = allFeeds[i].url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            }
        });

        
        it('have names', function() {
        var i, len;
        for (i = 0, len = allFeeds.length; i < len; i++) {
            var name = allFeeds[i].name;
            expect(name).toBeDefined();
            expect(name.length).not.toBe(0);
        }
        });
    });


    
    describe('The menu', function() {
        
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         
        it('changes visibility when menu icon is clicked', function() {

            // click on menu icon
            $('.menu-icon-link').click();

            // check that menu is shown
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // click on menu icon
            $('.menu-icon-link').click();

            // check that menu is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
   
    describe('Initial Entries', function() {
        
        beforeEach(function(done) {

            //load feed 0
            loadFeed(0, function() {

                //call done() to trigger the spec
                done();

            });

        });

        it('should have at least one entry', function(done) {

            // check that length of entries is more than 0
              var entryLength = $('.feed').find('.entry').length;
              expect(entryLength).toBeGreaterThan(0);
            // call done() to finish the spec
              done();

        });

    });
    
    describe("New Feed Selection", function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         * 
         * Also line 144 - line 154 verified element 0 called when loading instead
         * of element 1 in var allFields array in app.js
         * 
         */
       
        var firstFeed;
        var secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.entry').find("h2")[0].innerText;
            });
            loadFeed(1, function() {
                secondFeed = $('.entry').find("h2")[0].innerText;
                done();
            });
        });

        
        it("ensures content changes", function(done) {
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });

        afterAll(function(done) {
            loadFeed(0, done);
        }, 1000);

    });
});

